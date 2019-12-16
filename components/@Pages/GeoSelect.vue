<template lang="pug">
div
  select.lg(
    v-model="GEO.countryid"
    @change="GEO.regionid = null; GEO.townid = null"
  )
    //- option(
    //-   v-if="!countryid"
    //-   :value="null"
    //- ) Все
    option(
      v-for="country in countries"
      :value="country.countryid"
    ) {{country.name}}
  | &nbsp;
  select.lg(
    v-model="GEO.regionid"
  )
    //- option(
    //-   v-if="!regionid"
    //-   :value="null"
    //- ) Все
    option(
      v-for="region in computed_regions"
      :value="region.regionid"
    ) {{region.name}}
  | &nbsp;
  select.lg(
    :disabled="!GEO.regionid"
    v-model="GEO.townid"
    @change="geoSelected()"
  )
    //- option(
    //-   v-if="!townid"
    //-   :value="null"
    //- ) Все
    option(
      v-for="town in computed_towns"
      :value="town.townid"
    ) {{town.name}}

</template>

<script>
export default {
  // validator: prop => ['foo', 'bar'].includes(prop)
  props: {
    countryid: {
      type: [Number, String],
      default: null
    },
    regionid: {
      type: [Number, String],
      default: null
    },
    townid: {
      type: [Number, String],
      default: null
    },
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
        countryid: this.countryid,
        regionid: this.regionid,
        townid: this.townid

        // country_name: this.country_name,
        // region_name: this.region_name,
        // town_name: this.town_name
      }
    }
  },
  computed: {
    computed_regions() {
      return (
        // this.regions &&
        this.regions.filter(item => item.countryid == this.GEO.countryid)
      )
    },
    computed_towns() {
      return (
        // this.towns &&
        this.towns.filter(item => item.regionid == this.GEO.regionid)
      )
    },
    curr_country() {
      return this.countries.find(item => item.countryid == this.GEO.countryid)
        .name
    },
    curr_region() {
      return this.regions.find(item => item.regionid == this.GEO.regionid).name
    },
    curr_town() {
      return this.towns.find(item => item.townid == this.GEO.townid).name
    }
  },
  methods: {
    geoSelected() {
      // let emitNames = {
      //   curr_country: this.curr_country
      // }
      // this.$emit('selected', Object.assign({}, this.GEO, this.emitNames))
      // let { curr_country, curr_region, curr_town } = this
      console.table({ ...this.GEO })
      this.$emit('selected', {
        ...this.GEO
        // curr_country,
        // curr_region,
        // curr_town
      })
    }
  }
}
</script>
