<template>
  <aside class="w-64 h-screen bg-[#0F172A] text-gray-400 p-4 flex flex-col">
    <!-- Logo -->
    <div class="mb-4">
      <svg class="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    </div>

    <!-- Main Navigation -->
    <nav class="flex-1 mt-5 space-y-1">
      <router-link to="/" class="sidebar_def_style">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        inicio
      </router-link>

      <router-link to="/team" class="sidebar_def_style">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        Team
      </router-link>

      <router-link to="/projects" class="sidebar_def_style">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
        </svg>
        Projects
      </router-link>

      <router-link to="/calendar" class="sidebar_def_style">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        Calendario
      </router-link>

      <router-link to="/pomo-foco" class="sidebar_def_style">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        pomo-foco
      </router-link>

      <router-link to="/ai" class="flex text-purple-400 items-center px-4 py-2 rounded-lg hover:bg-purple-400 transition-colors hover:text-white duration-300 ">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
        foco AI
      </router-link>
    </nav>

    <!-- Teams Section -->
    <!-- <div class="mt-8">
      <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Your teams</h3>
      <div class="mt-4 space-y-2">
        <a href="#" class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <span class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm font-medium mr-3">H</span>
          Heroicons
        </a>
        <a href="#" class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <span class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm font-medium mr-3">T</span>
          Tailwind Labs
        </a>
        <a href="#" class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <span class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm font-medium mr-3">W</span>
          Workcation
        </a>
      </div>
    </div> -->

    <!-- Settings -->
    <div class="mt-auto pt-4 border-t border-gray-800">
      <router-link to="/settings" class="sidebar_def_style">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        Configuración
      </router-link>
    </div>
  </aside>
</template>

<script setup>
  name: 'Sidebar'

</script>