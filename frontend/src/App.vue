<template>
  <div id="app">
		<Header />
    <router-view/>
		<Footer />
  </div>
</template>

<script>

import Header from '@/components/MainPage/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
		Footer
  }
}
</script>

<style lang="scss">
@use 'sass:map';

@import "@/assets/_carbon";
@import '~@carbon/themes/scss/themes';

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-family: 'Roboto', 'Tahoma', 'sans-serif';
	background-image: url('./assets/background.png');
	min-height: 100vh;
	position: relative;
	padding-bottom: 90px;
}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
svg {
	color: currentColor;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
  text-decoration: none;
}

h1 {
  font-size: map.get($heading-07, font-size);
}

h2 {
  font-size: map.get($heading-06, font-size);
}

h3 {
  font-size: map.get($heading-03, font-size);
}
</style>
