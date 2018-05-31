/**
 * html页面定义的js功能都在这里实现
 */
function queryWeather(){
	var value = document.getElementById("qWeather").value;
	window.location.href="/extjsSpringM/wsQuery/weatherQuery.do?cities="+value;
}