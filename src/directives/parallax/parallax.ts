import { Directive, ElementRef, Renderer } from '@angular/core';


@Directive({
  selector: '[parallax]',
  host: {
  	'(ionScroll)': 'onCntscroll($event)',
  }

})
export class ParallaxDirective {

  constructor(public elem: ElementRef, public render: Renderer) {
    
  }

  header: any;
  main_cnt: any;
  ta: any;
  // sa: any;

  ngOnInit(){
  	let cnt = this.elem.nativeElement.getElementsByClassName('scroll-content')[0];

  	this.header = cnt.getElementsByClassName('bg')[0];

  	this.main_cnt = cnt.getElementsByClassName('main-cnt')[0];

  	this.render.setElementStyle(this.header, 'webTransformOrigin', 'center bottom');

  	this.render.setElementStyle(this.header, 'background-size', 'cover');

  	this.render.setElementStyle(this.main_cnt, 'position', 'absolute');
  }

  onCntscroll(ev){
  	ev.docWrite(() => {
  		this.update(ev);
  	});

  }
  	update(ev){

  		if(ev.scrollTop=0){
  			this.ta=ev.scrollTop/2;
  			// this.sa=1;

  		}

  		this.render.setElementStyle(this.header, 'webkitTransform', 'translate3d(0'+ this.ta +'px, 0) scale(1,1)');

  	}

}
