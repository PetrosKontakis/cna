import { Component, OnInit } from '@angular/core';
import { HttpAPIService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private suggestions = [];
  private page = 1;
  private pageStep = 40;
  private companies = [];
  private loadingCmp = false;
  private serverError = "";
  private selectedSuggetion = null;
  private searchInput = "";
  constructor(private api: HttpAPIService) { }

  ngOnInit() {
  }

  /**
   * 
   * @param input 
   */
  onInputChange(input: string): void{
    if(!input){
      return;
    }
    this.searchInput = input;
    this.getSuggestions(input)
  }

  /**
   * 
   * @param input 
   * @param exludedCna 
   */
  getSuggestions(input: string, exludedCna: string = null): void {
    
    this.api.searchCodeNumberActivity(input, exludedCna).subscribe(
      (response)=>{
        this.suggestions = response;
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        console.log("search completed")
      }
    )
  }

  /**
   * 
   * @param cna 
   */
  executeSearch(cna:string){
    this.loadingCmp = true;
    this.api.searchByCNA(cna, this.page, this.pageStep).subscribe(
      (response)=>{
        this.companies = [...this.companies, ...response];
        this.loadingCmp = false;
      },
      (error)=>{
        this.loadingCmp = false;
        console.log(error)
      },
      ()=>{
        this.loadingCmp = false;
        console.log("search completed")
      }
    )
  }

  /**
   * 
   */
  nextPage(){
    if(!this.selectedSuggetion){
      return;
    }
    this.page ++;
    this.executeSearch(this.selectedSuggetion.cna);
  }

  selectSuggetion(suggetion){
    this.searchInput = suggetion.title;
    this.suggestions = [];

    // // try for new suggetion
    if(suggetion.level <= 3){
      let querySpecifiedInRoot = suggetion.cna.substring(0, suggetion.level *2)
      this.getSuggestions(querySpecifiedInRoot, suggetion.cna)
    }else{
      this.selectedSuggetion = suggetion;
      this.executeSearch(suggetion.cna);
    }
  }

  hilightText(source: string, text:string){
    if(!source){
      return;
    }
    return source.replace(text, `<b>${text}</b>`);
  }


}
