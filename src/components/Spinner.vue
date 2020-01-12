<template>
  <div class="spin-backdrop">
    <div class="spin-modal">
      <div class="timer-loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style`>
/*
Not my work!
Credit: jlong  @github
Source: https://github.com/jlong/css-spinners && https://codepen.io/Iulius90/pen/RaeWmY
*/
@-moz-keyframes timer-loader {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes timer-loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes timer-loader {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.timer-loader:not(:required) {
  border: 6px solid #4b0082;
  -moz-border-radius: 24px;
  -webkit-border-radius: 24px;
  border-radius: 24px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
  width: 48px;
  height: 48px;
  margin-top: 50px;
  z-index: 40
}
.timer-loader:not(:required)::before {
  -moz-animation: timer-loader 1250ms infinite linear;
  -webkit-animation: timer-loader 1250ms infinite linear;
  animation: timer-loader 1250ms infinite linear;
  -moz-transform-origin: 3px 3px;
  -ms-transform-origin: 3px 3px;
  -webkit-transform-origin: 3px 3px;
  transform-origin: 3px 3px;
  background: #4b0082;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  content: '';
  display: block;
  position: absolute;
  width: 6px;
  height: 19.2px;
  left: 15px;
  top: 15px;
}
.timer-loader:not(:required)::after {
  -moz-animation: timer-loader 15000ms infinite linear;
  -webkit-animation: timer-loader 15000ms infinite linear;
  animation: timer-loader 15000ms infinite linear;
  -moz-transform-origin: 3px 3px;
  -ms-transform-origin: 3px 3px;
  -webkit-transform-origin: 3px 3px;
  transform-origin: 3px 3px;
  background: #4b0082;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  content: '';
  display: block;
  position: absolute;
  width: 6px;
  height: 16px;
  left: 15px;
  top: 15px;
}

.spin-backdrop {
  position: fixed;
	top: 0px;
	width: 100%;
	height: 100%;
  background-color:rgba(0,0,0,.5);
  opacity: 0.8;
  filter: alpha(opacity=50); /* For IE8 and earlier */
  z-index: 1;
}

.spin-modal {
  width: 150px;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, 0%);
	background: #F2F2F2;
	height: 150px;
	text-align: center;
  border-radius: 2px;
  z-index: 20;
  display: block !important;
}
</style>