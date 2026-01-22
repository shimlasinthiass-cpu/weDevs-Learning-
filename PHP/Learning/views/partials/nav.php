<nav class="bg-gray-800/50">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">

      <div class="flex items-center">
        <div class="shrink-0">
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
               alt="Your Company"
               class="size-8" />
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">

            <a href="/index"
               class="rounded-md px-3 py-2 text-sm font-medium <?= (urls('/') || urls('/index')) ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-700 hover:text-white' ?>"
               <?= (urls('/') || urls('/index')) ? "aria-current='page'" : '' ?>>
              Dashboard
            </a>

            <a href="/about"
               class="rounded-md px-3 py-2 text-sm font-medium <?= urls('/about') ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-700 hover:text-white' ?>"
               <?= urls('/about') ? "aria-current='page'" : '' ?>>
              Team
            </a>

            <a href="/projects"
               class="rounded-md px-3 py-2 text-sm font-medium <?= urls('/projects') ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-700 hover:text-white' ?>"
               <?= urls('/projects') ? "aria-current='page'" : '' ?>>
              Projects
            </a>

            <a href="/calander"
               class="rounded-md px-3 py-2 text-sm font-medium <?= urls('/calander') ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-700 hover:text-white' ?>"
               <?= urls('/calander') ? "aria-current='page'" : '' ?>>
              Calendar
            </a>

            <a href="/reports"
               class="rounded-md px-3 py-2 text-sm font-medium <?= urls('/reports') ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-700 hover:text-white' ?>"
               <?= urls('/reports') ? "aria-current='page'" : '' ?>>
              Reports
            </a>

          </div>
        </div>
      </div>

      <div class="hidden md:block">
        <div class="ml-4 flex items-center md:ml-6">
          <button type="button"
                  class="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
            <span class="sr-only">View notifications</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.5" aria-hidden="true" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31
                   A8.967 8.967 0 0 1 18 9.75V9
                   A6 6 0 0 0 6 9v.75
                   a8.967 8.967 0 0 1-2.312 6.022
                   c1.733.64 3.56 1.085 5.455 1.31
                   m5.714 0a24.255 24.255 0 0 1-5.714 0
                   m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </button>
        </div>
      </div>

      <div class="-mr-2 flex md:hidden">
        <button type="button"
                class="inline-flex items-center justify-center rounded-md p-2
                       text-gray-400 hover:bg-white/5 hover:text-white
                       focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
          <span class="sr-only">Open main menu</span>
          <svg class="size-6" fill="none" stroke="currentColor"
               viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</nav>
