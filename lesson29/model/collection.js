class Collection {
    static COMPLETED = 'completed';
    static PENDING = 'pending';

    #list = [];

    fetch() {
        return TodoAPI.getList().then((list => {
            this.setList(list);

            return this.getList();
        }))
    }

    toggle(id) {
        const todo = this.#list.find(item => item.id === +id);

        if (todo.status === Collection.COMPLETED) {
            todo.status = Collection.PENDING;
        } else {
            todo.status = Collection.COMPLETED;
        }

        TodoAPI.update(id, todo);

        return Promise.resolve();
    }

    create(value) {
        return TodoAPI.create({
            status: Collection.PENDING,
            title: value
        }).then((res) => {
            this.#list.push(res.data)
            return res.data.id
        })
    }

    delete(id) {
        this.#list = this.#list.filter(item => item.id !== +id);

        TodoAPI.delete(id);

        return Promise.resolve();
    }

    getItem(id) {
        return this.#list.find(item => item.id === +id);
    }

    setList(list) {
        this.#list = list;
    }

    getList() {
        return this.#list;
    }
}
