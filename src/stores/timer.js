import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timeLeft: 1500, // 25 minutes in seconds
    totalTime: 1500,
    isRunning: false,
    timerType: 'foco', // 'foco', 'pausa', 'pausalarga'
    currentTask: '',
    soundEnabled: true,
    currentNote: '',
    sessions: {
      total: 0,
      today: 0,
      focusTime: 0
    }
  }),

  actions: {
    startTimer() {
      this.isRunning = true
    },

    stopTimer() {
      this.isRunning = false
    },

    resetTimer() {
      this.timeLeft = this.totalTime
      this.isRunning = false
    },

    decrementTimer() {
      if (this.timeLeft > 0 && this.isRunning) {
        this.timeLeft--
      }
    },

    setTimerType(type) {
      this.stopTimer()
      this.timerType = type
      switch (type) {
        case 'foco':
          this.totalTime = 1500 // 25 minutes
          break
        case 'pausa':
          this.totalTime = 300 // 5 minutes
          break
        case 'pausalarga':
          this.totalTime = 900 // 15 minutes
          break
      }
      this.timeLeft = this.totalTime
    },

    setCurrentTask(task) {
      this.currentTask = task
    },

    completeSession() {
      if (this.timerType === 'foco') {
        this.sessions.total++
        this.sessions.today++
        this.sessions.focusTime += 25
      }
      if (this.soundEnabled) {
        const audio = new Audio(new URL('../assets/alert_timer.mp3', import.meta.url).href)
        audio.play()
      }
    },

    setNote(note) {
      this.currentNote = note
    },

    resetProgress() {
      this.sessions.total = 0
      this.sessions.today = 0
      this.sessions.focusTime = 0
    },

    toggleSound() {
      this.soundEnabled = !this.soundEnabled
    }
  },

  getters: {
    formattedTime: (state) => {
      const minutes = Math.floor(state.timeLeft / 60).toString().padStart(2, '0')
      const seconds = (state.timeLeft % 60).toString().padStart(2, '0')
      return `${minutes}:${seconds}`
    }
  }
})
