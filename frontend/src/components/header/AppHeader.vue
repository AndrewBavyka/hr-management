<script setup lang="ts">
import AppTitle from "@/components/title/AppTitle.vue"
import AppInput from "@/components/input/AppInput.vue"
import AppButton from "@/components/button/AppButton.vue"

</script>

<template>
    <header class="header">
        <AppTitle />

        <div class="header__user">
            <AppInput placeholder="Search" />
            <AppButton>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">

                    <defs>
                        <clipPath id="clip2_1757">
                            <rect id="Huge-icon/device/outline/notification" rx="-0.500000" width="23.000000"
                                height="23.000000" transform="translate(0.500000 0.500000)" fill="white"
                                fill-opacity="0" />
                        </clipPath>
                    </defs>
                    <g clip-path="url(#clip2_1757)">
                        <path id="Rectangle 136"
                            d="M5.83 17C4.26 17 3.42 15.09 4.45 13.87C4.94 13.3 5.24 12.59 5.33 11.83L5.67 8.79C6.05 5.49 8.77 3 12 3C15.22 3 17.94 5.49 18.32 8.79L18.66 11.83C18.75 12.59 19.05 13.3 19.54 13.87C20.57 15.09 19.73 17 18.16 17L5.83 17Z"
                            stroke="#16151C" stroke-opacity="1.000000" stroke-width="1.500000"
                            stroke-linejoin="round" />
                        <path id="Ellipse 219" d="M15 19C14.56 20.16 13.38 21 12 21C10.61 21 9.43 20.16 9 19"
                            stroke="#16151C" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linecap="round" />
                    </g>
                </svg>
            </AppButton>
            <div>USER</div>
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 0;
}

.header__user {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: auto;
}
</style>