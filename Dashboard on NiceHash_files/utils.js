var pad=function(n,width,z){z=z||'0';n=n+'';return n.length>=width?n:new Array(width- n.length+ 1).join(z)+ n;}
var formatDate=function(dt,format){if(Number.isInteger(dt))dt=new Date(dt);if(!dt||isNaN(dt.getTime()))return'';format=format.replace('ss',pad(dt.getSeconds(),2));format=format.replace('s',dt.getSeconds());format=format.replace('dd',pad(dt.getDate(),2));format=format.replace('d',dt.getDate());format=format.replace('mm',pad(dt.getMinutes(),2));format=format.replace('m',dt.getMinutes());format=format.replace('MM',pad(dt.getMonth()+1,2));format=format.replace(/M(?![ao])/,dt.getMonth()+1);format=format.replace('yyyy',dt.getFullYear());format=format.replace('YYYY',dt.getFullYear());format=format.replace('yy',(dt.getFullYear()+"").substring(2));format=format.replace('YY',(dt.getFullYear()+"").substring(2));format=format.replace('HH',pad(dt.getHours(),2));format=format.replace('H',dt.getHours());return format;}