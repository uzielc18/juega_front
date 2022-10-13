var _smartsupp = _smartsupp || {};
_smartsupp.key = "a88c2561276722bb33c8d227697690bc7daa100f";
_smartsupp.orientation = "right";
// ...
// your configuration
// ...
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);

const session_Storage = {
  get rolSemester(){
    const sesion = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return  '';
    }
  }
}
smartsupp('name', session_Storage.rolSemester.person.nombres_completos);
smartsupp('email', session_Storage.rolSemester.person.codigo);
