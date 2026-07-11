import { useKeyboard } from '~/client/composables/useKeyboard'
import { useToast } from '~/client/composables/useToast'
import { useProfiles } from '~/client/composables/useProfiles'

/**
 * Универсальный composable для управления редактируемыми CV-сущностями
 * в административной панели.
 *
 * Инкапсулирует общую логику, повторяющуюся в разделах Links, Experience,
 * Projects, Skills и других сущностях резюме:
 *
 * - загрузка списка сущностей для выбранного CV-профиля;
 * - выбор текущей сущности;
 * - хранение исходных и изменённых значений полей;
 * - проверка наличия изменений;
 * - подтверждение изменения отдельного поля;
 * - сохранение всех изменений формы;
 * - отмена изменений;
 * - изменение и сохранение порядка элементов;
 * - сброс выбранной сущности и состояния редактора;
 * - управление состояниями загрузки и обработка ошибок.
 *
 * Composable отделяет состояние и бизнес-логику CRUD-редактора от Vue-компонента,
 * оставляя компоненту только отображение данных и обработку пользовательского ввода.
 */
export function useCvEntityEditor() {
  useKeyboard({
    esc: resetSelection,
  })
  const toast = useToast()
  const {
    profiles,
    selectedProfileId
  } = useProfiles({ setFirstAsSelect: true })

  interface LinkOrderItem {
    id: string
    order: number
    label?: string
  }

  const links = ref<Link[]>([])
  const linksOrder = ref<LinkOrderItem[]>([])
  const isSaveReorderLoading = ref(false)
  const isSubmitFormChangesLoading = ref(false)

  /** true - если порядок ссылок изменен */
  const linksAreReordered = computed(() => {
    for (let i = 0; i < links.value.length; i++) {
      const link = links.value[i];
      if (linksOrder.value[i].order !== link.order) {
        return true
      }
    }
    return false
  })

  const linksByProfileId = computed(() => {
    if (!selectedProfileId.value) return links.value
    return links.value.filter(v => (v.profileId === selectedProfileId.value))
  })
  const selectedLink = ref<Link | null>(null)

  type LinkEditData = Partial<Record<keyof LinkInput, {
    oldValue: LinkInput[keyof LinkInput]
    newValue: LinkInput[keyof LinkInput]
    focused: boolean,
    loading: boolean,
  }>>
  type LinkEditBody = Partial<Record<keyof LinkInput, LinkInput[keyof LinkInput]>>

  const editLinkFormData = ref<LinkEditData>({
    isVisible: { newValue: _, oldValue: _, focused: false, loading: false },
    label: { newValue: _, oldValue: _, focused: false, loading: false },
    order: { newValue: _, oldValue: _, focused: false, loading: false },
    profileId: { newValue: _, oldValue: _, focused: false, loading: false },
    type: { newValue: _, oldValue: _, focused: false, loading: false },
    url: { newValue: _, oldValue: _, focused: false, loading: false },
  })

  function selectLink(link: Link) {
    selectedLink.value = link
    for (const key of Object.keys(link)) {
      const k = key as keyof typeof link
      editLinkFormData.value[k] = {
        newValue: link[k],
        oldValue: link[k],
        focused: false,
        loading: false
      }
    }
  }

  function resetSelection() {
    selectedLink.value = null
    Object.values(editLinkFormData.value).forEach((v) => {
      v.newValue = _
      v.oldValue = _
      v.focused = false
      v.loading = false
    })
    resetChangesOrder()
  }

  /** Обновляет исходный массив ссылок после изменений */
  function refreshSource(body: LinkEditBody) {
    links.value = links.value.map((l) => {
      if (l.id === selectedLink.value?.id) {
        return { ...l, ...body as Link }
      }
      return l
    })
  }

  /** Отменить изменения в поле */
  function undoChanges(field: keyof LinkInput) {
    editLinkFormData.value[field]!.newValue = editLinkFormData.value[field]?.oldValue
    resetFocus(field)
  }

  /** Проверка есть ли изменения в поле */
  function hasChanges(field: keyof LinkInput) {
    return editLinkFormData.value[field]!.newValue !== editLinkFormData.value[field]?.oldValue
  }

  /** Сбросить фокус на поле */
  function resetFocus(field: keyof LinkInput) {
    editLinkFormData.value[field]!.focused = false
  }

  /** Есть ли хотя бы одно изменение сущности link */
  const someChange = computed(() => {
    return Object
      .values(editLinkFormData.value)
      .some((v) => v.newValue !== v.oldValue)
  })

  /** Подтвердить изменение поля */
  async function confirmUpdateField(field: keyof LinkInput) {
    try {
      if (!selectedLink.value) return
      if (!hasChanges(field)) return
      editLinkFormData.value[field]!.loading = true

      const body = { [field]: editLinkFormData.value[field]?.newValue }
      const result = await CvLinksApi.patch(selectedLink.value.id, body)
      if (!result) throw _;

      //  Зафиксировать изменение в исходном массиве
      refreshSource(body)
      resetFocus(field)
      resetSelection()

      toast.success('Ссылка изменена', { duration: 3000, title: 'Success!' })
    }
    catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при обновлении поля', {
        duration: 3000,
        title: 'Ошибка',
      })
    }
    finally {
      editLinkFormData.value[field]!.loading = false
    }
  }

  function resetFormChanges() {
    for (const k of Object.keys(editLinkFormData.value)) {
      undoChanges(k as keyof LinkInput)
    }
  }

  async function submitFormChanges() {
    try {
      isSubmitFormChangesLoading.value = true

      if (!selectedLink.value) return
      // Если изменений форме ссылки нет, тогда выход
      if (!someChange.value) return

      // Собираем объект измененных полей ссылки
      const body: LinkEditBody = {}
      for (const [k, v] of Object.entries(editLinkFormData.value)) {
        if (hasChanges(k as keyof LinkInput)) {
          body[k as keyof LinkInput] = v.newValue
        }
      }
      const result = await CvLinksApi.patch(selectedLink.value?.id, body as PatchCvLinkDto)
      if (!result) throw _

      //  Зафиксировать изменение в исходном массиве
      refreshSource(body)
      resetSelection()
      toast.success('Ссылка изменена', { duration: 3000, title: 'Success!' })
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при изменении данных ссылки', {
        duration: 3000,
        title: 'Ошибка',
      })
    }
    finally {
      isSubmitFormChangesLoading.value = false
    }

  }

  async function saveNewOrder() {
    try {
      isSaveReorderLoading.value = true

      const success = await CvLinksApi.reorder({
        linksOrder: linksOrder.value,
        profileId: selectedProfileId.value,
      })

      if (success) {
        // Обновление ссылок для сброса состояния
        await uploadLinks()
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при изменении порядка ссылок', {
        duration: 3000,
        title: 'Ошибка',
      })
    }
    finally {
      isSaveReorderLoading.value = false
    }
  }

  function moveLink(direction: 'up' | 'down') {
    const selectedId = selectedLink.value?.id
    if (!selectedId) return

    const idx = links.value.findIndex((link) => link.id === selectedId)
    // MOVE UP
    if (direction === 'up') {
      if (idx <= 0) {
        return
      }
      ;[links.value[idx - 1], links.value[idx]] = [links.value[idx], links.value[idx - 1]]
    }
    // MOVE DOWNs
    else if (direction === 'down') {
      if (idx === -1 || idx === links.value.length - 1) {
        return
      }
      ;[links.value[idx], links.value[idx + 1]] = [links.value[idx + 1], links.value[idx]]
    }
    for (let i = 0; i < links.value.length; i++) {
      const link = links.value[i]

      linksOrder.value[i] = {
        id: link.id,
        order: i + 1,
        label: link.label,
      }
    }
  }

  function resetChangesOrder() {
    linksOrder.value = links.value
      .sort((a, b) => a.order - b.order)
      .map((v) => ({
        id: v.id,
        order: v.order,
        label: v.label
      }))
  }

  function goToNewLinkPage() {
    window.location.href = AppRoutes.admin.CvLinksNew
  }

  async function uploadLinks(options?: { resetSelection?: boolean }) {
    // Если Нужно сбросить прошлое состояние формы перед рендерингом нового списка ссылок
    if (options?.resetSelection) {
      resetSelection()
    }

    links.value = await CvLinksApi.getListByProfileId(
      selectedProfileId.value || _,
    )
    linksOrder.value = links.value.map((v) => ({ id: v.id, order: v.order, label: v.label }))
  }

  onBeforeMount(async () => {
    await uploadLinks({ resetSelection: true })
  })
}
