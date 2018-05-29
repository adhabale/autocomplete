 import{Component,ElementRef,Output,EventEmitter,DoCheck,Input} from '@angular/core';
declare var $:any;
 @Component({
    selector: 'multi-autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    template:`
         <div class="container hidden-sm-down" >
            <div class="input-field">
              <input id="country" type="text" class="validate filter-input form-control" [(ngModel)]=query (keyup)=filter()>
           
            </div>
             <div class="suggestions" *ngIf="filteredList.length > 0"> 
                <ul class="none">
                    <li *ngFor="let item of filteredList" >
                       <input type="checkbox" [value]="item.obj.uname" [checked]="item.checked" (change)="select(item)" [id]="item.obj.id">
                        <a data-toggle="tooltip" title="{{item.obj.uname}}">{{item.obj.uname}}</a>
                    </li>
                </ul>
             </div> 
        </div>  	 




           <div class="hidden-sm-up" >
            <div class="input-field">
              <input id="country" type="text" class="validate form-control" [(ngModel)]=query (keyup)=filter()>
           
            </div>
             <div class="suggestions-mbl" *ngIf="filteredList.length > 0"> 
                <ul class="none">
                   <li *ngFor="let item of filteredList" >
                       <input type="checkbox" [value]="item.obj.uname" [checked]="item.checked" (change)="select(item)" [id]="item.obj.id">
                        <a data-toggle="tooltip" title="{{item.obj.uname}}">{{item.obj.uname}}</a>
                    </li>
                </ul>
             </div> 
        </div>

`,
  styleUrls: ['./multi-autocomplete.css']

          
})


export class MultiAutocompleteComponent  {
    public query = '';
    public selected = []; 
    public filteredList = [];
    public elementRef;
    isChecked:boolean=false;
    //list=[];
    
    @Input() list;
        @Input() removedIndex;

    @Output() onUserSelection= new EventEmitter();
      @Output() onRemove= new EventEmitter();
    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    ngOnInit(): void {

    }


    filter() {
    if (this.query !== ""){
        this.filteredList = this.list.filter(function(el){
            return el.obj.uname.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}
 

     select(item) {
     
         if (this.selected.indexOf(item) == -1) {
             var  objIndex = this.list.indexOf(item)
        this.list[objIndex].checked=!this.list[objIndex].checked;
         console.log(this.list);
                 this.selected.push(item);
                 this.onUserSelection.emit(this.selected);
                
             }
              
    
            else{
                var  objIndex = this.list.indexOf(item)
                 this.list[objIndex].checked=!this.list[objIndex].checked;
                var index=this.selected.indexOf(item);
                 this.selected.splice(index,1);
                 this.onUserSelection.emit(this.selected);

            }

}


handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
}


}