(function(){
    class SimpleTree{
        constructor(selector,treeData,options) {
            if(!selector){
                throw new Error('必须传入一个树菜单容器！')
            }
            else if(typeof selector === 'string') {
                this.container = document.querySelector(selector)
            }
            else if(selector.nodeType){
                this.container = selector
            }
            this.handleOptions(options);
            this.container.innerHTML = this.bindHtml(treeData,true);
            this.handleExpand();
        }
        handleOptions(options) {
            let _default = {
                open: true
            }
            for (const key in options) {
                if (Object.hasOwnProperty.call(options, key)) {
                    _default[key] = options[key]
                    
                }
            }
            for (const key in _default) {
                if (Object.hasOwnProperty.call(_default, key)) {
                   this[key] = _default[key]
                }
            }
        }
        bindHtml(treeData,root) {
            let treeStr = root? 
                `<ul class="level level0">` : 
                this.open? `<ul class="level levelChildren">` : `<ul class="level levelChildren" style="display: none;">`;
            treeData.forEach(item => {
                let hasChildren = item.children && item.children.length;
                treeStr += `<li><span class="${hasChildren? this.open? 'iconMinus' : 'iconPlus' : 'iconFile'}"></span>
                            <a href="javascript:;">${item.name}</a>`;
                if(hasChildren) {
                    treeStr += this.bindHtml(item.children,false);
                }else{
                    treeStr += '</li>'
                }
            })
            treeStr += '</ul>'
            return treeStr;
        }
        handleExpand() {
            let expandBtns = document.querySelectorAll('span.iconMinus,span.iconPlus');
            [].forEach.call(expandBtns, item => {
                item.addEventListener('click', ev => {
                    let show = [].indexOf.call(ev.target.classList,'iconPlus');
                    let childUl = ev.target.parentElement.querySelector('ul');
                    if(show >= 0) {
                        childUl.style.display = 'block';
                        item.classList.remove('iconPlus');
                        item.classList.add('iconMinus');
                    }else{
                        childUl.style.display = 'none';
                        item.classList.remove('iconMinus');
                        item.classList.add('iconPlus');
                    }
                })

            })
        }
    }
    window.SimpleTree = SimpleTree;
})()