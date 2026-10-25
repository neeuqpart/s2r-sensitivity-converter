import {test} from 'node:test';import assert from 'node:assert/strict';import {convert} from './dist/math.mjs';
const setup={source:2,roblox:1,multiplier:.088,dpi:800,targetDpi:800};
test('Source 2 equals bhop .088 at base 1 and same DPI',()=>{const r=convert(setup);assert.ok(Math.abs(r.value-.088)<1e-12);assert.ok(Math.abs(r.cm-25.97727272727)<1e-8);});
test('base sensitivity and DPI scaling preserve physical turning',()=>{assert.ok(Math.abs(convert({...setup,roblox:.2}).value-.44)<1e-12);assert.ok(Math.abs(convert({...setup,targetDpi:1600}).value-.044)<1e-12);});
test('reverse conversion round-trips with custom yaw and different DPI',()=>{const v={...setup,source:3.25,roblox:.36,yaw:.0165,robloxYaw:.4,targetDpi:1600};const r=convert(v);const back=convert({...v,multiplier:r.value,reverse:true});assert.ok(Math.abs(back.value-v.source)<1e-12);assert.ok(Math.abs(back.cm-r.cm)<1e-12);});
test('invalid and non-finite values cannot produce a command',()=>{for(const value of [0,-1,NaN,Infinity])for(const key of ['source','roblox','dpi','targetDpi'])assert.throws(()=>convert({...setup,[key]:value}));assert.throws(()=>convert({...setup,multiplier:0,reverse:true}));});
test('hidden input from other direction does not invalidate conversion',()=>{assert.equal(convert({...setup,multiplier:0}).value,.088);assert.equal(convert({...setup,source:0,reverse:true}).value,2);});
