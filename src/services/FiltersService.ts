import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Filters} from "../models/filters.model";

@Injectable()
export class FiltersService {

  filtersFromUser = new Filters();
  constructor() { }

  setFilters(filters) {
    // console.log(filters.maxDis);
    // debugger;
    this.filtersFromUser.maxDist = filters.maxDist;
    this.filtersFromUser.addictsType = filters.addictsType;
    this.filtersFromUser.female = filters.female;
    this.filtersFromUser.male = filters.male;
    this.filtersFromUser.ageRangeLower = filters.ageRangeLower;
    this.filtersFromUser.ageRangeUpper = filters.ageRangeUpper;
  }

  getFilters(): any{
    console.log("hi im in filterservice");
    if(this.filtersFromUser == null){
      console.log("hi im in filterservice1");
      return null;
    }
    console.log("the filters in filterService.ts are: " + this.filtersFromUser.addictsType);
    return this.filtersFromUser;
  }
}
