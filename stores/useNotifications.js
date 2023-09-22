export const useNotifications = defineStore("notifications", () => { 
    const notificationList = ref([])
    function showNotification(type, title, text, link) {
        const id = Math.random().toString(16).split(".")[1] + Date.now().toString(16)
        notificationList.value.push({
            fading:false,
            id:id ,
            title: title,
            type: type,
            text: text,
            link:link
        })
        setTimeout(()=>removeNotification(id),10000)
    }
    function removeNotification(id) {
        notificationList.value.find(n => n.id == id).fading = true
        setTimeout(() => notificationList.value = notificationList.value.filter(n => n.id != id),550)
    }
    return {list:notificationList, showNotification, removeNotification}
})