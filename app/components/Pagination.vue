<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageLength: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['emit-number'])
const pageArray = ref([])
const pageNo = ref(1)

const updatePageArray = () => {
  if (props.pageLength > 5) {
    if (pageNo.value < 4) pageArray.value = Array.from(Array(5)).map((_, i) => i + 1)
    else if (pageNo.value > props.pageLength - 3)
      pageArray.value = Array.from(Array(5))
        .map((_, i) => props.pageLength - i)
        .sort((a, b) => a - b)
    else pageArray.value = Array.from({ length: 5 }, (_, i) => pageNo.value + i - 2)

    if (props.pageLength > 6) {
      if (pageNo.value > 4) pageArray.value.unshift('...')
      if (pageNo.value < props.pageLength - 3) pageArray.value.push('...')
    }

    if (pageNo.value > 3) pageArray.value.unshift(1)
    if (pageNo.value < props.pageLength - 2) pageArray.value.push(props.pageLength)
  } else
    pageArray.value = Array.from(Array(5))
      .map((_, i) => i + 1)
      .filter((e) => e <= props.pageLength)

  emitPageNo()
  window.scrollTo(0, 0, 'auto')
}
const pageNoIs = (number) => {
  pageNo.value = number
  updatePageArray()
}
const pagePrev = () => {
  pageNo.value--
  updatePageArray()
}
const pageNext = () => {
  pageNo.value++
  updatePageArray()
}
const emitPageNo = () => {
  emit('emit-number', pageNo.value)
}

watch(
  () => props.pageLength,
  () => {
    pageNoIs(1)
  },
)

watch(
  () => props.currentPage,
  (newPage) => {
    if (newPage !== pageNo.value) pageNoIs(newPage)
  },
)

pageNoIs(props.currentPage)
</script>
<template>
  <ul class="bg-secondary border-primary *:border-primary align-stretch mx-auto flex h-10 max-w-min justify-center rounded-xl border shadow-(--card-shadow)">
    <button :disabled="pageNo === 1" class="group rounded-none border-r px-3 sm:px-4" @click="pagePrev">
      <i class="fa-solid fa-chevron-left group-disabled:opacity-30"></i>
    </button>
    <button
      v-for="(n, index) in pageArray"
      :key="index"
      :class="n === pageNo ? 'bg-primary text-cta -my-0.5' : 'border-r'"
      class="group rounded-none px-3 sm:px-4"
      :disabled="n === '...'"
      @click="pageNoIs(n)"
    >
      <span class="min-w-3 group-disabled:opacity-50">{{ n }}</span>
    </button>
    <button :disabled="pageNo === props.pageLength" class="group rounded-none px-3 sm:px-4" @click="pageNext">
      <i class="fa-solid fa-chevron-right group-disabled:opacity-30"></i>
    </button>
  </ul>
</template>
