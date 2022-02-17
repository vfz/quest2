<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-light" style="background-color: #e3f2fd;">
    <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">Navbar</a> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            
            <li class="nav-item">
            <router-link
                tag="a"
                to="/"
                exact
                class="nav-link"
                active-class="active"
                aria-current="page"
                href="#"
            >
                Список задач
            </router-link>
            </li>
            <li class="nav-item">
            <router-link
                tag="a"
                to="/new"
                class="nav-link"
                active-class="active"
                aria-current="page"
                href="#"
            >
                Создать задачу
            </router-link>
            </li>
            
        </ul>
        </div>
    </div>
    </nav>
</template>
