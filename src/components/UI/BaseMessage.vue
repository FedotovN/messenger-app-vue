<template>
    <div class="message_wrapper"
        :class="
        {
            'incoming': message.type === 'incoming',
            'outcoming': message.type === 'outcoming'
        }"   
        >
        <div class="person_image">
            <div class="image_wrapper">
                <img v-if="message.photoUrl" :src="message.photoUrl" alt="">
            </div>
        </div>
        <div class="info">
            <div class="row">
                <small>{{ message.name }}</small>
                <i v-if="message.type === 'outcoming'" class="fa-solid fa-ellipsis option" @click="openOptions"></i>
            </div>
            <p>{{ message.text }}</p>
            <div class="row">
                <small>{{ fixDate(message.date) }}</small>
                <div class="status" v-if="message.type ==='outcoming'">
                    <i class="fa-solid fa-check-double" v-if="message.status === 'checked'"></i>
                    <i class="fa-solid fa-check" v-else-if="message.status === 'sended'"></i>
                    <i class="fa-solid fa-clock" v-else></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dateFilter } from '@/utils/dateFilter';
export default {
    name: 'BaseMessage',
    props: ['message'],
    data(){
        return {}
    },
    methods: {
        fixDate(date){
            return dateFilter.filterDate(date)
        },
        openOptions() {
            this.$emit('openOptions', this.message)
        }
    }
}
</script>

<style lang="scss" scoped>
.message_wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: $dark-color;
    color: $white-color;
    border-radius: 8px;
    padding: 10px 15px;
    min-width: 220px;
    max-width: 400px;
    .image_wrapper {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .info {
        width: 100%;
        white-space: pre-wrap;
        display: flex;
        flex-flow: column nowrap;
        gap: 15px;
        small {
            color: $grey-color;
            font-size: 12px;
        }
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            i {
                font-size: 15px;
                transition: .3s;
                &.option {
                    width: 50px;
                    text-align: end;
                    cursor: pointer;
                    &:hover{
                        color: $accent-color;
                    }
                }
            }
            small {
                max-width: 145px;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        p {
            max-width: 300px;
            overflow: hidden;
            font-size: 15px;
            word-wrap: break-word;
        }
    }
&.incoming {
    background-color: $white-color;
    color: $dark-color;
    box-shadow: 5px 5px 10px 1px rgba($grey-color, .4);
    align-self: flex-start;
    .info small {
        color: $dark-color;
    }
}
&.outcoming {
    color: $white-color;
    align-self: flex-end;
}
}
</style>