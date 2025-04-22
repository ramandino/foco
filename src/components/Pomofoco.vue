<script setup>
import { useTimerStore } from '../stores/timer'
import { onMounted, onUnmounted, ref } from 'vue'
import Dialog from 'primevue/dialog';


const store = useTimerStore()
let interval
const visible = ref(false)

const definetimer = (type) => {
  stopTimer()
  store.setTimerType(type === 'foco_option' ? 'foco' : type === 'pausa_option' ? 'pausa' : 'pausalarga')
}

const startTimer = () => {
  store.startTimer()
  if (!interval) {
    interval = setInterval(() => {
      store.decrementTimer()
      if (store.timeLeft === 0) {
        store.completeSession()
        stopTimer()
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
    <div class="flex flex-col mx-auto w-full">
        <div id="pomofoco_container" class="max-w-4xl w-3xl mx-auto mt-8 p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
            <!-- Header Section -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-100">pomofoco</h1>
                <div class="flex items-center space-x-1">
                    <div class="text-sm text-gray-400">
                        <span class="font-medium text-gray-300">{{ store.sessions.today }}</span> sesiones hoy
                    </div>
                    <button
                        @click="store.toggleSound()"
                        class="p-2 rounded-full text-white hover:bg-gray-800 transition-all duration-200"
                        :title="store.soundEnabled ? 'Desactivar sonido' : 'Activar sonido'"
                    >
                        <svg v-if="store.soundEnabled" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Timer Type Selection -->
            <div class="flex justify-center space-x-4 mb-6">
                <button 
                    @click="definetimer('foco_option')"
                    :class="['px-4 py-2 rounded-lg font-medium transition-all duration-200', 
                            store.timerType === 'foco' ? 'bg-red-400 text-white ring-2 ring-red-400 ring-offset-1 ring-offset-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700']"
                >
                    foco 
                </button>
                <button 
                    @click="definetimer('pausa_option')"
                    :class="['px-4 py-2 rounded-lg font-medium transition-all duration-200',
                            store.timerType === 'pausa' ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-1 ring-offset-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700']"
                >
                    pausa corta
                </button>
                <button 
                    @click="definetimer('pausalarga_option')"
                    :class="['px-4 py-2 rounded-lg font-medium transition-all duration-200',
                            store.timerType === 'pausalarga' ? 'bg-blue-400 text-white ring-2 ring-blue-400 ring-offset-1 ring-offset-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700']"
                >
                    pausa larga 
                </button>
            </div>

            <!-- Task and Timer Section -->
            <div class="bg-gray-800/50 rounded-xl p-6 mb-6">
                <div class="flex flex-col items-center mb-6">
                    <div class="text-7xl font-bold text-gray-100 mb-3 font-mono tracking-tight">
                        {{ store.formattedTime }}
                    </div>
                    <!-- <div class="text-sm text-gray-400 capitalize font-medium">{{ store.timerType }}</div> -->
                </div>

                <div class="space-y-4">
                    <input 
                        type="text" 
                        v-model="store.currentTask" 
                        placeholder="¿En qué estás trabajando?"
                        class="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 text-sm placeholder-gray-500"
                    />
                    <textarea
                        v-model="store.currentNote"
                        placeholder="Notas rápidas para esta sesión..."
                        class="w-full px-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 text-sm placeholder-gray-500 h-24 resize-none"
                    ></textarea>
                </div>
            </div>

            <!-- Controls Section -->
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-400">
                    <!-- <span class="font-medium text-gray-300">{{ store.sessions.focusTime }}</span> minutos totales de foco -->
                </div>
                <div class="flex space-x-4">
                    <button 
                        @click="startTimer()"
                        :disabled="!store.currentTask && store.timerType === 'foco'"
                        :class="['px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                                !store.currentTask && store.timerType === 'foco' 
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-400 hover:bg-red-700 text-white shadow-lg shadow-red-600/20']"
                    >
                        iniciar
                    </button>
                    <button 
                        @click="stopTimer()"
                        class="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm font-medium shadow-lg shadow-gray-900/20"
                    >
                        detener
                    </button>
                    <button 
                        @click="resetTimer(); store.resetProgress()"
                        class="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm font-medium shadow-lg shadow-gray-900/20"
                    >
                        reiniciar
                    </button>
                </div>
            </div>
        </div>


        
        <div class="mx-auto flex flex-row mt-4 text-gray-400 hover:text-gray-300 cursor-pointer items-center gap-1" @click="visible = true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <div>¿que es pomofoco?</div>
            
            <Dialog 
                v-model:visible="visible" 
                modal 
                header="¿Qué es pomofoco?" 
                :style="{ 
                    width: '90%',
                    maxWidth: '50rem',
                    background: '#111827',
                    position: 'fixed',
                    top: '50%',
                    left: 'calc(50% + 120px)', // Adjust for half the sidebar width
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '0.75rem',
                    border: '1px solid #374151'
                }"
                @click.stop
                :maskStyle="{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }"
                :contentStyle="{
                    background: '#111827',
                    color: '#f3f4f6',
                    padding: '1.5rem'
                }"
                :headerStyle="{
                    background: '#111827',
                    color: '#f3f4f6',
                    borderBottom: '1px solid #374151',
                    padding: '1rem 1.5rem'
                }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
                <p class="text-gray-300 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p class="text-gray-300 leading-relaxed">
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                    ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
            </Dialog>
        </div>
        
    </div>
</template>