<template lang="pug">
.grid
  header.header
  aside.sidenav
    h1 aside
  main.main
    <nuxt />
  footer.footer © 2019 closedfolders
</template>


<style lang="stylus">

// https://medium.com/mtholla/build-a-framework-free-dashboard-using-css-grid-and-flexbox-53d81c4aee68
// https://codepen.io/trooperandz/pen/EOgJvg

$height-header = 50px;
$height-footer = 50px;

$width-sidenav = 240px;
$bg-sidenav = #354052
$MW = 46em


.grid
  display: grid;

  height: 100vh;
  overflow-x: hidden; // for hidden sidenav
  background #F5F9FC
  
  // grid-template-columns: 100%; // Charts responsiveness won't work with fr units
  grid-template-columns: 240px calc(100% - 240px);

  grid-template-rows: $height-header 1fr $height-footer;

  // grid-template-areas:
  //   'header'
  //   'main'
  //   'footer';


  grid-template-areas:
    'sidenav header'\
    'sidenav main'\
    'sidenav footer';


// @media (min-width: $MW)
//   .grid
//     grid-template-columns: 240px calc(100% - 240px);
//     grid-template-areas:
//       'sidenav header'
//       'sidenav main'
//       'sidenav footer';

//   .sidenav
//     transform: translateX(0);



.header
  grid-area: header;
  box-shadow: 0 0 2rem 0 rgba(53,64,82,.1);




.main
  grid-area: main;

.footer
  grid-area: footer;

.sidenav
  grid-area: sidenav;
  // width: $width-sidenav; 
  background-color: $bg-sidenav;
  // transform: translateX(-245px);
  // transition: all .6s ease-in-out;
  // box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  // z-index: 2;







</style>