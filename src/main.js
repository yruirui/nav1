const x=localStorage.getItem('x')
const objectX=JSON.parse(x)
let $siteList=$('.siteList')
let $last=$siteList.find('li.last')
const hashmap=objectX || [
    {logo:'m',url:'https://music.163.com/'},
    {logo:'B',url:'https://bilibili.com/'}
]
x
const simplifyUrl=(url)=>{
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')
}
const render=()=>{  
  $siteList.find('li:not(.last)').remove()
   hashmap.forEach((node,index)=>{
    const $li=$(` <li >   
        <div class="site">
        <div class="closeButton"><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
            </svg>
        </div>
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>            
        </div>      
   </li>`).insertBefore($last)
   $li.on('click',()=>{
       window.open(node.url)
   })
   $li.on('click','.closeButton',(e)=>{
    e.stopPropagation() //阻止冒泡
    hashmap.splice(index,1)
    render()
    })   
  })
}
render()
$('.add').on('click',()=>{
   let url= window.prompt('请输入要添加的网址')
   if(url.indexOf('http')!==0){
        url='https://'+url
   }
   hashmap.push({
    logo: simplifyUrl(url)[0],
    logoType:'text',
    url: url
   });
  //$siteList.find('li:no(.last)').remove()
   render()
})
window.onbeforeunload = ()=> {
    const string =JSON.stringify(hashmap)
    localStorage.setItem('x',string)
    /** localstorage 是一个本地的存储，它只能存字符串，json.stringify是用来转化的 */
  };
  $(document).on('keypress',(e)=>{
      const k =e.key
      for(let i=0;i<hashmap.length;i++){
          const l= hashmap[i].log.toLowerCase()       
          if(l===k){
              window.open(hashmap[i].url)
          }
      }
  })