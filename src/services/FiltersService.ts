import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FiltersService {
  filters: any = {
    // maxDis: 0,
    // addictsType: "",
    // femaleValue: false,
    // maleVale: false,
    // ageRangeLower: 0,
    // ageRangeUpper: 0

  };

  // filters: {[k: strissng]: any} = {};
  constructor() { }

  setFilters(filters) {
    console.log(filters.maxDis);
    debugger;
    this.filters.maxDis = filters.maxDis;
    this.filters.addictsType = filters.addictsType;
    this.filters.femaleValue = filters.femaleValue;
    this.filters.maleVale = filters.maleVale;
    this.filters.ageRangeLower = filters.ageRangeLower;
    this.filters.ageRangeUpper = filters.ageRangeUpper;
  }

  getFilters(): any{
    console.log("hi im in filterservice");
    if(this.filters == null){
      console.log("hi im in filterservice1");
      return null;
    }
    console.log("the filters in filterService.ts are: " + this.filters.addictsType);
    return this.filters;
  }
}
