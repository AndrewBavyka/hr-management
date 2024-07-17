<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  name: String,
  description: String
})

enum AvatarColor {
  GlobalRed2600 = 'global-red-2-600',
  GlobalRed2500 = 'global-red-2-500',
  GlobalOrange500 = 'global-orange-500',
  GlobalYellow500 = 'global-yellow-500',
  GlobalYellow300 = 'global-yellow-300',
  GlobalLightGreen400 = 'global-light-green-400',
  GlobalLightGreen600 = 'global-light-green-600',
  GlobalGreen600 = 'global-green-600',
  GlobalGreen300 = 'global-green-300',
  GlobalTurquoise300 = 'global-turquoise-300',
  GlobalTurquoise400 = 'global-turquoise-400',
  GlobalCyan300 = 'global-cyan-300',
  GlobalCyan500 = 'global-cyan-500',
  GlobalBlue600 = 'global-blue-600',
  GlobalBlue400 = 'global-blue-400',
  GlobalDeepPurple400 = 'global-deep-purple-400',
  GlobalDeepPurple600 = 'global-deep-purple-600',
  GlobalPurple600 = 'global-purple-600',
  GlobalPurple400 = 'global-purple-400',
  GlobalRed500 = 'global-red-500',
  GlobalRed400 = 'global-red-400',
  ColorsLightSecondary = 'colors-light-secondary',
  ColorsLightText = 'colors-light-text',
  ColorsLightDarkBlue = 'colors-light-dark-blue'
}

const userAvatarRandomColor = ref('')

const randomColorsUser = () => {
  const colors: string[] = Object.values(AvatarColor)

  userAvatarRandomColor.value += colors[Math.floor(Math.random() * colors.length)]
}

randomColorsUser()
</script>

<template>
  <div class="app-user__info">
    <awc-user-info
      :avatar-color="userAvatarRandomColor"
      :name="props.name"
      :description="props.description"
    >
    </awc-user-info>
    <awc-icon type="icon" size="24" name="arrow_right_large"></awc-icon>
  </div>
</template>

<style scoped>
.app-user__info {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
</style>
