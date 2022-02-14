export default {
    state: {
        tasks: [],
    },
    mutations: {
        updateTask(state, tasks) {
            //console.log(tasks[0]);
            state.tasks = tasks.map(i => {
                i.info = false;
                return i
            })
        }
    },
    actions: {
        async getTasks(ctx, lim = 3) {
            const res = await fetch("https://test.evrotrans.net/API/quest2.php?lim=" + lim);
            const tasks = await res.json();
            ctx.commit('updateTask', tasks)
        }
    },
    modules: {},
    getters: {
        allTasks(state) {
            return state.tasks
        }
    }

}