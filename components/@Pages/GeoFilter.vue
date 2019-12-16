<template lang="pug">
.GeoFilter
  span
    //- .mark countries
    select.lg(
      v-model="GEO.countryid"
      @change="GEO.regionid = null; GEO.townid = null"
    )
      option(
        :value="null"
      ) Все
      option(
        v-for="country in countries"
        :value="country.countryid"
      ) {{country.name}}

  | &nbsp;
  span
    //- .mark regions
    select.lg(
      v-model="GEO.regionid"
      @change="GEO.townid ? GEO.townid = null : ''"
    )
      option(
        :value="null"
      ) Все
      option(
        v-for="region in computed_regions"
        :value="region.regionid"
      ) {{region.name}}
  | &nbsp;
  span
    //- .mark towns
    select.lg(
      v-model="GEO.townid"
      :disabled="!GEO.regionid"
    )
      option(
        :value="null"
      ) Все
      option(
        v-for="town in computed_towns"
        :value="town.townid"
      ) {{town.name}}
  | &nbsp;
  .btn.fill.orange(
    @click="geoSelected()"
  )  фильтр


</template>

<script>
export default {
  // validator: prop => ['foo', 'bar'].includes(prop)
  props: {
    countries: {
      type: Array,
      default: null
    },
    regions: {
      type: Array,
      default: null
    },
    towns: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      GEO: {
        countryid: 1,
        regionid: null,
        townid: null
      }
    }
  },
  computed: {
    computed_regions() {
      return this.GEO.countryid
        ? this.regions.filter(item => item.countryid == this.GEO.countryid)
        : this.regions
    },
    computed_towns() {
      return this.GEO.regionid
        ? this.towns.filter(item => item.regionid == this.GEO.regionid)
        : this.towns
    }
  },
  methods: {
    geoSelected() {
      // console.log(this.GEO)
      this.$emit('geofilter', this.GEO)

      // for (let prop in this.GEO) {
      //   this.GEO[prop] = ''
      // }
    }
  }
}
</script>
