
#!/usr/bin/env python3

import subprocess
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "project-snapshot.md"

EXCLUDED_DIRS = {
    ".git",
    "node_modules",
    "scripts",
    "dist",
    "build",
    "coverage",
    ".cache",
    ".vite",
    ".idea",
    ".vscode",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    "../drizzle/meta"
}

EXCLUDED_FILES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "bun.lock",
    "bun.lockb",
    "composer.lock",
    "Cargo.lock",
    "poetry.lock",
    "uv.lock",
    ".eslintcache",
    ".DS_Store",
    "Thumbs.db",
    "README.md",
    OUTPUT.name,
}

EXCLUDED_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".webp",
    ".ico", ".svg", ".pdf",
    ".woff", ".woff2", ".ttf", ".otf",
    ".zip", ".tar", ".gz", ".7z",
    ".exe", ".dll", ".so", ".bin",
    ".map", ".pyc",
}

LANGUAGES = {
    ".vue": "vue",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".js": "javascript",
    ".jsx": "jsx",
    ".json": "json",
    ".css": "css",
    ".scss": "scss",
    ".html": "html",
    ".md": "markdown",
    ".py": "python",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".sh": "bash",
    ".toml": "toml",
    ".xml": "xml",
}

MAX_FILE_SIZE = 1_000_000


def get_git_files() -> list[Path]:
    """Получить файлы с учётом .gitignore."""

    result = subprocess.run(
        [
            "git",
            "ls-files",
            "--cached",
            "--others",
            "--exclude-standard",
            "-z",
        ],
        cwd=ROOT,
        capture_output=True,
        check=True,
    )

    paths = [
        Path(path.decode("utf-8", errors="surrogateescape"))
        for path in result.stdout.split(b"\0")
        if path
    ]

    return sorted(set(paths))


def is_excluded(path: Path) -> bool:
    if path.name in EXCLUDED_FILES:
        return True

    if path.suffix.lower() in EXCLUDED_EXTENSIONS:
        return True

    if any(part in EXCLUDED_DIRS for part in path.parts):
        return True

    # Исключаем потенциально секретные файлы
    if path.name == ".env" or path.name.startswith(".env."):
        return True

    if path.name.endswith((".pem", ".key", ".p12", ".pfx")):
        return True

    return False


def get_source_files() -> list[Path]:
    files = []

    for relative_path in get_git_files():
        if is_excluded(relative_path):
            continue

        absolute_path = ROOT / relative_path

        if not absolute_path.is_file():
            continue

        if absolute_path.is_symlink():
            continue

        if absolute_path.stat().st_size > MAX_FILE_SIZE:
            continue

        files.append(relative_path)

    return files


def build_tree(files: list[Path]) -> str:
    lines = [f"{ROOT.name}/"]

    directories = set()

    for path in files:
        for parent in path.parents:
            if parent != Path("."):
                directories.add(parent)

    entries = [(path, True) for path in directories]
    entries += [(path, False) for path in files]

    entries.sort(key=lambda item: (
        tuple(part.lower() for part in item[0].parts),
        not item[1],
    ))

    for path, is_dir in entries:
        depth = len(path.parts) - 1
        prefix = "    " * depth + "└── "

        name = path.name + ("/" if is_dir else "")
        lines.append(prefix + name)

    return "\n".join(lines)


def fence_for(content: str) -> str:
    """Создать ограждение, не конфликтующее с содержимым."""
    longest = 0

    for line in content.splitlines():
        stripped = line.lstrip()
        if stripped.startswith("`"):
            count = len(stripped) - len(stripped.lstrip("`"))
            longest = max(longest, count)

    return "`" * max(3, longest + 1)


def generate_snapshot() -> None:
    files = get_source_files()

    sections = [
        "# Project Source Snapshot",
        "",
        f"Project: `{ROOT.name}`",
        f"Generated: {datetime.now().astimezone().isoformat()}",
        f"Files: {len(files)}",
        "",
        "## Project Structure",
        "",
        "```text",
        build_tree(files),
        "```",
        "",
        "## Source Files",
        "",
    ]

    included = 0

    for relative_path in files:
        absolute_path = ROOT / relative_path

        try:
            content = absolute_path.read_text(encoding="utf-8")
        except (UnicodeError, OSError):
            continue

        # Не включаем бинарные данные
        if "\0" in content:
            continue

        language = LANGUAGES.get(
            relative_path.suffix.lower(),
            "",
        )

        fence = fence_for(content)

        sections.extend([
            f"### `{relative_path.as_posix()}`",
            "",
            f"{fence}{language}",
            content.rstrip("\n"),
            fence,
            "",
        ])

        included += 1

    OUTPUT.write_text(
        "\n".join(sections) + "\n",
        encoding="utf-8",
    )

    print(f"Snapshot created: {OUTPUT}")
    print(f"Files included: {included}")
    print(f"Size: {OUTPUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    generate_snapshot()
