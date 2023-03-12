<template>
    <div class="chat_header">
        <div class="header_start">
            <div class="back_btn" @click="$router.push('/')">
                <i class="fa-solid fa-angle-left"></i>
            </div>
            <div class="title">
                <div class="image_wrapper">
                    <img
                    v-if="$store.state.chat.currContactPhoto"
                    :src="$store.state.chat.currContactPhoto"
                    :alt="name">
                </div>
                <p>{{ $store.state.chat.currContactName }}</p>
            </div>
        </div>
        <div class="options" @click="$emit('openOptions')">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseNavbar',
    props: ['name', 'uid'],
}
</script>

<style lang="scss" scoped>
.chat_header {
    color: $dark-color;
    height: 60px;
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    box-shadow: 10px 5px 10px 1px $grey-color;
    .header_start {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    .contacts_button {
        padding: 10px 20px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover i {
            filter: opacity(0.8);
        }
        i {
            font-size: 25px;
        }
    }
    .back_btn {
        cursor: pointer;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        &:hover i {
            color: $accent-color;
        }
        i {
            transition: .3s;
            font-size: 22px;
        }   
    }
    .options {
        width: 50px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        transition: .3s;
        &:hover {
            cursor: pointer;
            color: $accent-color;
        }
    }
    .title, .options {
        display: flex;
        align-items: center;
    }
    .title {
        max-width: 320px;
        overflow: hidden;
        display: flex;
        gap: 20px;
        .image_wrapper  {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            background-color: $grey-color;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        p {
            max-width: 260px;
            overflow-x: hidden;
            white-space: nowrap;
            font-size: 18px;
        }
    }
}
@media (max-width: 700px) {
    .title {
        max-width: 320px;
        overflow: hidden;
        display: flex;
        gap: 20px;
        .image_wrapper  {
            width: 25px;
            height: 25px;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        p {
            font-size: 14px;
        }
    }
}
</style>