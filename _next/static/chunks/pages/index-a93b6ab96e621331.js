(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(1035)}])},8769:function(e,t,i){"use strict";i.d(t,{Z:function(){return o}});var n=i(5893),r=i(1664),s=i.n(r),l=i(9008),a=i.n(l);function o(e){let{children:t,meta:i}=e;return void 0===i&&(i={}),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(a(),{children:[(0,n.jsx)("title",{children:i.title?"".concat(i.title," | Arjun Mahishi"):"Arjun Mahishi"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,n.jsx)("meta",{name:"description",content:i.description||"Arjun Mahishi's personal website"}),(0,n.jsx)("link",{rel:"preload",href:"https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css",as:"script"}),(0,n.jsx)("link",{href:"/gruvbox.css",rel:"stylesheet"})]}),(0,n.jsx)("div",{className:"grid place-items-center",children:t}),(0,n.jsxs)("footer",{className:"text-center text-gray-500 text-sm mt-5 pb-2",children:["Built from scratch with "," ",(0,n.jsx)(s(),{href:"https://nextjs.org/",className:"underline decoration-dashed underline-offset-4 decoration-2",children:"Next.js"})," and "," ",(0,n.jsx)(s(),{href:"https://tailwindcss.com/",className:"underline decoration-dashed underline-offset-4 decoration-2",children:"Tailwind CSS"})]})]})}},3909:function(e,t,i){"use strict";i.d(t,{Z:function(){return l}});var n=i(5893),r=i(1664),s=i.n(r);function l(){return(0,n.jsxs)("nav",{className:"flex flex-col lg:flex-row lg:w-2/3 place-items-center lg:place-items-start",children:[(0,n.jsx)("div",{className:"text-2xl",children:(0,n.jsx)(s(),{className:"underline decoration-2 underline-offset-4",href:"/",children:"ಅರ್ಜುನ್ ಮಹಿಷಿ"})}),(0,n.jsx)("div",{className:"flex grow justify-end mt-2 lg:mt-0",children:(0,n.jsx)("ul",{className:"p-1",children:[{title:"About",href:"/about"},{title:"Projects",href:"/projects"},{title:"Blog",href:"/posts"},{title:"Vim-Adventures",href:"/vim-adventures"}].map((e,t)=>(0,n.jsx)("li",{className:"mx-2 inline-block align-text-bottom",children:(0,n.jsx)(s(),{className:"underline underline-offset-4 decoration-2",href:e.href,children:e.title})},t))})})]})}},3740:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(6495).Z,r=i(2648).Z,s=i(1598).Z,l=i(7273).Z,a=s(i(7294)),o=r(i(2636)),c=i(7757),d=i(3735),u=i(3341);i(4210);var f=r(i(7746));let h={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function m(e){return void 0!==e.default}function g(e){return"number"==typeof e||void 0===e?e:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function p(e,t,i,r,s,l,a){if(!e||e["data-loaded-src"]===t)return;e["data-loaded-src"]=t;let o="decode"in e?e.decode():Promise.resolve();o.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("blur"===i&&l(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,s=!1;r.current(n({},t,{nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>s,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{s=!0,t.stopPropagation()}}))}(null==s?void 0:s.current)&&s.current(e)}})}let x=a.forwardRef((e,t)=>{var{imgAttributes:i,heightInt:r,widthInt:s,qualityInt:o,className:c,imgStyle:d,blurStyle:u,isLazy:f,fill:h,placeholder:m,loading:g,srcString:x,config:v,unoptimized:j,loader:w,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:_,setShowAltText:E,onLoad:N,onError:S}=e,C=l(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadRef","onLoadingCompleteRef","setBlurComplete","setShowAltText","onLoad","onError"]);return g=f?"lazy":g,a.default.createElement(a.default.Fragment,null,a.default.createElement("img",Object.assign({},C,{loading:g,width:s,height:r,decoding:"async","data-nimg":h?"fill":"1",className:c,style:n({},d,u)},i,{ref:a.useCallback(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(S&&(e.src=e.src),e.complete&&p(e,x,m,b,y,_,j))},[x,m,b,y,_,S,j,t]),onLoad:e=>{let t=e.currentTarget;p(t,x,m,b,y,_,j)},onError:e=>{E(!0),"blur"===m&&_(!0),S&&S(e)}})))}),v=a.forwardRef((e,t)=>{let i,r;var s,{src:p,sizes:v,unoptimized:j=!1,priority:w=!1,loading:b,className:y,quality:_,width:E,height:N,fill:S,style:C,onLoad:k,onLoadingComplete:z,placeholder:R="empty",blurDataURL:A,layout:M,objectFit:O,objectPosition:P,lazyBoundary:I,lazyRoot:B}=e,L=l(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoad","onLoadingComplete","placeholder","blurDataURL","layout","objectFit","objectPosition","lazyBoundary","lazyRoot"]);let F=a.useContext(u.ImageConfigContext),T=a.useMemo(()=>{let e=h||F||d.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),i=e.deviceSizes.sort((e,t)=>e-t);return n({},e,{allSizes:t,deviceSizes:i})},[F]),Z=L,D=Z.loader||f.default;delete Z.loader;let W="__next_img_default"in D;if(W){if("custom"===T.loader)throw Error('Image with src "'.concat(p,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}else{let e=D;D=t=>{let{config:i}=t,n=l(t,["config"]);return e(n)}}if(M){"fill"===M&&(S=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[M];e&&(C=n({},C,e));let t={responsive:"100vw",fill:"100vw"}[M];t&&!v&&(v=t)}let G="",q=g(E),V=g(N);if("object"==typeof(s=p)&&(m(s)||void 0!==s.src)){let e=m(p)?p.default:p;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(e)));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(e)));if(i=e.blurWidth,r=e.blurHeight,A=A||e.blurDataURL,G=e.src,!S){if(q||V){if(q&&!V){let t=q/e.width;V=Math.round(e.height*t)}else if(!q&&V){let t=V/e.height;q=Math.round(e.width*t)}}else q=e.width,V=e.height}}let U=!w&&("lazy"===b||void 0===b);((p="string"==typeof p?p:G).startsWith("data:")||p.startsWith("blob:"))&&(j=!0,U=!1),T.unoptimized&&(j=!0),W&&p.endsWith(".svg")&&!T.dangerouslyAllowSVG&&(j=!0);let[J,X]=a.useState(!1),[Y,H]=a.useState(!1),$=g(_),K=Object.assign(S?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:O,objectPosition:P}:{},Y?{}:{color:"transparent"},C),Q="blur"===R&&A&&!J?{backgroundSize:K.objectFit||"cover",backgroundPosition:K.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'.concat(c.getImageBlurSvg({widthInt:q,heightInt:V,blurWidth:i,blurHeight:r,blurDataURL:A,objectFit:K.objectFit}),'")')}:{},ee=function(e){let{config:t,src:i,unoptimized:n,width:r,quality:s,sizes:l,loader:a}=e;if(n)return{src:i,srcSet:void 0,sizes:void 0};let{widths:o,kind:c}=function(e,t,i){let{deviceSizes:n,allSizes:r}=e;if(i){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(i);n)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:r.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:r,kind:"w"}}if("number"!=typeof t)return{widths:n,kind:"w"};let s=[...new Set([t,2*t].map(e=>r.find(t=>t>=e)||r[r.length-1]))];return{widths:s,kind:"x"}}(t,r,l),d=o.length-1;return{sizes:l||"w"!==c?l:"100vw",srcSet:o.map((e,n)=>"".concat(a({config:t,src:i,quality:s,width:e})," ").concat("w"===c?e:n+1).concat(c)).join(", "),src:a({config:t,src:i,quality:s,width:o[d]})}}({config:T,src:p,unoptimized:j,width:q,quality:$,sizes:v,loader:D}),et=p,ei={imageSrcSet:ee.srcSet,imageSizes:ee.sizes,crossOrigin:Z.crossOrigin},en=a.useRef(k);a.useEffect(()=>{en.current=k},[k]);let er=a.useRef(z);a.useEffect(()=>{er.current=z},[z]);let es=n({isLazy:U,imgAttributes:ee,heightInt:V,widthInt:q,qualityInt:$,className:y,imgStyle:K,blurStyle:Q,loading:b,config:T,fill:S,unoptimized:j,placeholder:R,loader:D,srcString:et,onLoadRef:en,onLoadingCompleteRef:er,setBlurComplete:X,setShowAltText:H},Z);return a.default.createElement(a.default.Fragment,null,a.default.createElement(x,Object.assign({},es,{ref:t})),w?a.default.createElement(o.default,null,a.default.createElement("link",Object.assign({key:"__nimg-"+ee.src+ee.srcSet+ee.sizes,rel:"preload",as:"image",href:ee.srcSet?void 0:ee.src},ei))):null)});t.default=v,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7757:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getImageBlurSvg=function(e){let{widthInt:t,heightInt:i,blurWidth:n,blurHeight:r,blurDataURL:s,objectFit:l}=e,a=n||t,o=r||i,c=s.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return a&&o?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(a," ").concat(o,"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(n&&r?"1":"20","'/%3E").concat(c,"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(s,"'/%3E%3C/svg%3E"):"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='".concat("contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none","' x='0' y='0' height='100%25' width='100%25' href='").concat(s,"'/%3E%3C/svg%3E")}},7746:function(e,t){"use strict";function i(e){let{config:t,src:i,width:n,quality:r}=e;return"".concat(t.path,"?url=").concat(encodeURIComponent(i),"&w=").concat(n,"&q=").concat(r||75)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i.__next_img_default=!0,t.default=i},1035:function(e,t,i){"use strict";i.r(t),i.d(t,{__N_SSG:function(){return u},default:function(){return f}});var n=i(5893),r=i(5675),s=i.n(r),l=i(1664),a=i.n(l),o=i(8769),c=i(3909);function d(e){let{link:t,type:i,text:r,className:l}=e,o=32,c=32;return"linkedin"===i&&(o=30,c=30),(0,n.jsx)(a(),{className:"flex flex-row underline decoration-dashed underline-offset-4 decoration-2 ".concat(l||""),href:t,children:(0,n.jsx)(s(),{src:"/img/".concat(i,".svg"),alt:i,width:o,height:c})})}var u=!0;function f(e){let{allPostsData:t,socialLinks:i}=e,r=t[0];return(0,n.jsxs)(o.Z,{children:[(0,n.jsx)(c.Z,{}),(0,n.jsx)("div",{className:"flex flex-col items-center justify-center py-2 mt-10",children:(0,n.jsx)(s(),{src:"/img/dp.jpg",alt:"Arjun Mahishi",width:400,height:400,className:"rounded-full"})}),(0,n.jsxs)("span",{className:"text-center text-gray-500 text-lg mt-5",children:[(0,n.jsx)(a(),{href:"/posts/".concat(r.id),className:"flex",children:"Read my latest blog post →"}),(0,n.jsx)(a(),{href:"https://github.com/arjunmahishi/dotfiles",className:"flex",children:"Checkout my .dotfiles →"})]}),(0,n.jsx)("div",{className:"flex flex-row justify-center mt-5 lg:mt-10 items-center",children:i.map(e=>(0,n.jsx)(d,{className:"lg:p-2",link:e.link,type:e.type,text:e.text},e.type))})]})}},5675:function(e,t,i){e.exports=i(3740)}},function(e){e.O(0,[996,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);