<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="title font-weight-regular">Linear Trending</h4>
      </v-flex>
      <v-flex v-for="(item, index) in trending" :key="'trending' + index" xs12 sm4 lg4>
        <linear-statistic
          :title="item.subheading"
          :sub-title="item.caption"
          :icon="item.icon.label"
          :color="item.icon.color"
          :value="item.linear.value"
        />
      </v-flex>

      <v-flex xs12>
        <h4 class="title font-weight-regular">Circle Trending</h4>
      </v-flex>
      <v-flex v-for="(item, index) in trending2" :key="'c-trending' + index" xs12 sm4 lg4>
        <circle-statistic
          :title="item.subheading"
          :sub-title="item.headline"
          :caption="item.caption"
          :icon="item.icon.label"
          :color="item.linear.color"
          :value="item.linear.value"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LinearStatistic from '@/components/widgets/LinearStatistic'

import CircleStatistic from '@/components/widgets/CircleStatistic'

export default {
  name: 'Dashboard',
  components: {
    LinearStatistic,
    CircleStatistic
  },
  data() {
    return {
      trending: [
        {
          subheading: 'Sales',
          headline: '2,55',
          caption: 'increase',
          percent: 15,
          icon: {
            label: 'mdi-trending-up',
            color: 'success'
          },
          linear: {
            value: 15,
            color: 'success'
          }
        },
        {
          subheading: 'Revenue',
          headline: '6,553',
          caption: 'increase',
          percent: 10,
          icon: {
            label: 'mdi-trending-down',
            color: 'error'
          },
          linear: {
            value: 15,
            color: 'error'
          }
        },
        {
          subheading: 'Orders',
          headline: '5,00',
          caption: 'increase',
          percent: 50,
          icon: {
            label: 'mdi-arrow-up',
            color: 'info'
          },
          linear: {
            value: 50,
            color: 'info'
          }
        }
      ],
      trending2: [
        {
          subheading: 'Email',
          headline: '15+',
          caption: 'email opens',
          percent: 15,
          icon: {
            label: 'mdi-email',
            color: 'info'
          },
          linear: {
            value: 15,
            color: 'info'
          }
        },
        {
          subheading: 'Tasks',
          headline: '90%',
          caption: 'tasks completed.',
          percent: 90,
          icon: {
            label: 'mdi-format-list-bulleted-square',
            color: 'primary'
          },
          linear: {
            value: 90,
            color: 'success'
          }
        },
        {
          subheading: 'Issues',
          headline: '100%',
          caption: 'issues fixed.',
          percent: 100,
          icon: {
            label: 'mdi-bug',
            color: 'primary'
          },
          linear: {
            value: 100,
            color: 'error'
          }
        }
      ]
    }
  }
}
</script>
