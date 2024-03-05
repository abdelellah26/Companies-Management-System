import { Component, ViewChild, OnInit, NgZone } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { YearService } from "../../services/product/detailProduct/year.service";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  isDropdownVisible = false;
  isDropdownVisible2 = false;


  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private ngZone:NgZone,
    private yearService: YearService) {
    








    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148,0,0,0]
        }
      ],
      chart: {
        height: 290,
        type: "bar"
      },
      title: {
        text: ""
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
      }
    };


    this.chartOptions2= {
      series: [
        {
          name: "My-series",
          data: [10, 400, 35, 51, 49, 62, 69, 91, 148,0,0,0]
        },
        {
          name: "My-series",
          data: [100, 41, 35, 51, 49, 62, 69, 91, 148,0,0,0]
        },
        {
          name: "My-series",
          data: [40, 31, 35, 51, 49, 62, 69, 91, 148,0,0,0]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: ""
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep","Oct","Nov","Dec"]
      }
    };
  }


  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  toggleDropdown2() {
    this.isDropdownVisible2 = !this.isDropdownVisible2;
  }


  ngOnInit(): void {

  }
}
