import {convert} from './math.mjs';
const $=id=>document.getElementById(id);
const fields=['source','roblox','multiplier','dpi','targetDpi','yaw'];
let reverse=false, command='';
const fmt=n=>Number(n.toPrecision(8)).toString();
function values(){return Object.fromEntries(fields.map(id=>[id,($(id).value.trim()===''?NaN:Number($(id).value))]));}
function render(){
  $('copy-status').textContent='';
  try{
    const v=values(); const r=convert({...v,reverse});
    $('result').textContent=fmt(r.value); $('cm').textContent=r.cm.toFixed(2);
    command=(reverse?'sensitivity ':'/sens ')+fmt(r.value);$('command').textContent=command;$('copy').disabled=false;$('error').textContent='';
    $('instruction').textContent=reverse?'Paste the command into the Source console. Keep the Source DPI entered above.':`Keep Roblox at ${fmt(v.roblox)}, then paste the command into bhop chat.`;
  }catch(e){$('result').textContent='—';$('cm').textContent='—';$('command').textContent='Enter valid settings';$('error').textContent=e.message;$('copy').disabled=true;$('instruction').textContent='Enter positive numbers to see your match.';command='';}
}
function direction(next,carry=true){
  const previous=Number($('result').textContent);
  if(carry&&Number.isFinite(previous)&&previous>0) $(next?'multiplier':'source').value=fmt(previous);
  reverse=next;
  $('game-pair').classList.toggle('reversed',next);
  $('source-input').hidden=next;
  $('multiplier-wrap').hidden=!next;
  $(next?'source-output':'roblox-output').append($('result-block'));
  $('result-label').textContent=next?'Sensitivity':'In-game sensitivity';
  $('result-caption').textContent=next?'Source console sensitivity':'/sens multiplier';
  $('swap').setAttribute('aria-label',next?'Swap to Source to Roblox':'Swap to Roblox to Source');
  render();
}
$('swap').onclick=()=>direction(!reverse);
$('settings').addEventListener('submit',e=>e.preventDefault());
$('settings').addEventListener('input',e=>{if(fields.includes(e.target.id)){render();try{localStorage.setItem('s2r-settings',JSON.stringify(values()));}catch{}}});
$('reset').onclick=()=>{$('settings').reset();try{localStorage.removeItem('s2r-settings');}catch{}direction(false,false);};
$('copy').onclick=async()=>{if(!command)return;try{await navigator.clipboard.writeText(command);$('copy-status').textContent='Copied.';}catch{$('copy-status').textContent='Select and copy the command above.';const range=document.createRange();range.selectNodeContents($('command'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);}};
try{const saved=JSON.parse(localStorage.getItem('s2r-settings'));if(saved)for(const id of fields)if(Number.isFinite(saved[id])&&saved[id]>0)$(id).value=saved[id];}catch{}
render();


