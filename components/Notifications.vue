<template>
    <div class=" fixed right-0 bottom-0 z-50 flex flex-col mr-1" >
        <div v-for="notification in notifications.list" role="alert"
            :class="['rounded-xl', 'border' ,'border-gray-900', 'bg-zinc-900','p-4', 'm-4','hover:border-gray-800',notification.fading?'fading-animation':'']">
            <div class="flex items-start gap-4">
                <span v-if="notification.type === 'success'" class="text-green-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <span v-else-if="notification.type === 'error'" class="text-red-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clip-rule="evenodd" />
                    </svg>
                </span>

                <div class="flex-1">
                    <strong class="block font-medium text-white"> {{ notification.title }} </strong>

                    <p class="mt-1 text-sm text-gray-300">
                        {{ notification.text }}
                    </p>
                    <a v-if="notification.link" target="_blank" :href="notification.link.href" class="text-xs mt-2 text-blue-700 hover:text-blue-900 inline-flex flex-row justify-between">{{ notification.link.title }} <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg></a>
                </div>

                <button class="text-white transition hover:text-gray-600" @click="notifications.removeNotification(notification.id)">
                    <span class="sr-only">Dismiss</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const notifications = useNotifications()
</script>
