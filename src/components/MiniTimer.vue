<script setup>
import { useTimerStore } from '../stores/timer'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useTimerStore()

// Draggable directive
const vDraggable = {
  mounted: (el) => {
    el.style.position = 'fixed'
    let isDragging = false
    let currentX
    let currentY
    let initialX
    let initialY
    let xOffset = 0
    let yOffset = 0

    const dragStart = (e) => {
      initialX = e.type === 'touchstart' ? e.touches[0].clientX - xOffset : e.clientX - xOffset
      initialY = e.type === 'touchstart' ? e.touches[0].clientY - yOffset : e.clientY - yOffset
      if (e.target === el) isDragging = true
    }

    const dragEnd = () => {
      initialX = currentX
      initialY = currentY
      isDragging = false
    }

    const drag = (e) => {
      if (isDragging) {
        e.preventDefault()
        currentX = e.type === 'touchmove' ? e.touches[0].clientX - initialX : e.clientX - initialX
        currentY = e.type === 'touchmove' ? e.touches[0].clientY - initialY : e.clientY - initialY
        xOffset = currentX
        yOffset = currentY
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
    }

    el.addEventListener('touchstart', dragStart, false)
    el.addEventListener('touchend', dragEnd, false)
    el.addEventListener('touchmove', drag, false)
    el.addEventListener('mousedown', dragStart, false)
    el.addEventListener('mouseup', dragEnd, false)
    el.addEventListener('mousemove', drag, false)
  }
}
let interval

const startTimer = () => {
  store.startTimer()
  if (!interval) {
    interval = setInterval(() => {
      store.decrementTimer()
      if (store.timeLeft === 0) {
        store.stopTimer()
        clearInterval(interval)
        interval = null
      }
    }, 1000)
  }
}

const stopTimer = () => {
  store.stopTimer()
  clearInterval(interval)
  interval = null
}

const resetTimer = () => {
  stopTimer()
  store.resetTimer()
}

onMounted(() => {
  if (store.isRunning) {
    startTimer()
  }
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
  <div
    v-draggable
    class="fixed top-4 right-4 bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50 w-48"
  >
    <div class="text-2xl font-mono text-center mb-2 text-white">{{ store.formattedTime }}</div>
    <div class="text-sm text-center text-gray-300">{{ store.timerType }}</div>
  </div>
</template>