/* Cookie-authenticated same-origin progress. No level passwords or client completion authority. */
(() => {
  'use strict';
  async function api(path,body){
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try{
      const response=await fetch('/api/'+path,{credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:{'Content-Type':'application/json'},...(body!==undefined?{method:'POST',body:JSON.stringify(body)}:{})});
      const result=await response.json();if(!response.ok){const error=new Error(result.error||'Request failed.');error.status=response.status;throw error;}return result;
    }finally{clearTimeout(timeout);}
  }
  function showCompleted(level){
    let badge=document.getElementById('zodiac-completion-status');
    if(!badge){badge=document.createElement('div');badge.id='zodiac-completion-status';badge.setAttribute('role','status');Object.assign(badge.style,{position:'fixed',bottom:'16px',left:'50%',transform:'translateX(-50%)',background:'#392b22',color:'#fff6e4',border:'1px solid #ad8b4b',borderRadius:'4px',padding:'10px 17px',font:'12px/1.5 Arial,sans-serif',zIndex:'9999',maxWidth:'90vw',textAlign:'center'});document.body.append(badge);}
    badge.textContent=`Level ${level} completed · Saved to your solo / team record`;
  }
  function showFinish(result){
    if(!result.finish)return;
    const labels={1:'🥇 1ST PLACE',2:'🥈 2ND PLACE',3:'🥉 3RD PLACE'},finish=result.finish;
    const seconds=Math.max(0,Math.floor(finish.elapsed_seconds));
    const clock=[Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':');
    let badge=document.getElementById('zodiac-completion-status');if(!badge){showCompleted(4);badge=document.getElementById('zodiac-completion-status');}
    badge.textContent=(labels[finish.podium_place]||'ALL FOUR LEVELS COMPLETE')+' · Timer stopped at '+clock;
  }
  function errorMessage(error,element){
    element.replaceChildren();if([401,403].includes(error.status)){
      element.append(document.createTextNode('Log in to your existing investigator account first. '));const link=document.createElement('a');link.href='/';link.textContent='Open login';link.style.cssText='color:inherit;text-decoration:underline';link.onclick=()=>{try{sessionStorage.setItem('zodiac_return_to',location.pathname);}catch(_){}};element.append(link);
    }else element.textContent=error.name==='AbortError'||error.message==='Failed to fetch'?'Connection interrupted. Please try again.':error.message;
  }
  async function verify(level,password){const result=await api(`levels/${level}/submit`,{password});showCompleted(level);showFinish(result);return result;}
  async function resume(level){try{const result=await api('progress');if(result.completed_levels.includes(level)){showCompleted(level);showFinish(result);return true;}}catch(_){}return false;}
  function watch(level,reveal){
    let busy=false,revealed=false,authenticated=false;
    async function check(){if(busy||document.hidden)return;busy=true;
      try{const result=await api('progress');authenticated=true;showFinish(result);if(result.completed_levels.includes(level)&&!revealed){revealed=true;showCompleted(level);showFinish(result);reveal();}}
      catch(error){if(error.status===401&&authenticated){try{sessionStorage.setItem('zodiac_return_to',location.pathname);}catch(_){}location.assign('/');}}
      finally{busy=false;}
    }
    check();setInterval(check,4000);window.addEventListener('focus',check);
  }
  window.ZodiacLevels={verify,resume,watch,errorMessage};
})();
