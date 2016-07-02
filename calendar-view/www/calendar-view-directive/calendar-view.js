angular.module('directive.calendarView', [])
  .directive('calendarView', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl:'calendar-view-directive/calendar-view.html',
        scope: {
          callback: '&'
        },
        link: function(scope,elem,attr){

            // label months
            var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            scope.monthnames=monthNames;
            //label days
            var namedays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

          scope.weekday= namedays;

            scope.init=function(date,underlinetoday)
            {

              if(date.getFullYear()==new Date().getFullYear() && date.getMonth()==new Date().getMonth())
                underlinetoday=true;

                // firstday
                var firstday = new Date(date.setDate(1));

                // set name of month
                scope.month=monthNames[firstday.getMonth()];

                // set year
                scope.year=firstday.getFullYear();

                //current day
                if(underlinetoday)
                    scope.day=new Date().getUTCDate();
                else
                    scope.day=-1;

                //number days in month
                var numdays=new Date(scope.year, firstday.getMonth()+1, 0).getDate();
                var index=namedays.indexOf(namedays[ firstday.getDay()]) ;
                var arrayDays=[];


                var count=1;
                for(var i = 0; i<42; i++ )
                {
                    if(i<index)
                        arrayDays[i]={value:"/"};
                    else
                    {
                    arrayDays[i]={value:count};
                    count++;
                    }

                    if(i>=index+numdays)
                      arrayDays[i]={value:"/"};

                }
               scope.days=arrayDays;

            }


            //function select day
            scope.selectday=function(d)
            {
              var check= parseInt(d);
                if(isNaN(check))
                {
                  return;
                }
               var v = new Date();
                v.setDate(d);
                v.setFullYear(scope.year)
                v.setMonth(scope.monthnames.indexOf(scope.month));
                v = new Date(v);

               scope.callback()(v);

            }

            scope.managemonth=function(step)
            {
                if(scope.monthnames.indexOf(scope.month)+step>11)
                {
                    step=0
                    scope.year+=1;
                }else
                if(scope.monthnames.indexOf(scope.month)+step==-1)
                {
                    step=11
                    scope.year+=-1;
                }
                else
                step=scope.monthnames.indexOf(scope.month)+step;

                var firstday = new Date();
                firstday.setDate(1);
                firstday.setFullYear(scope.year);
                firstday.setMonth(step);
                 firstday = new Date(firstday);
                scope.init(firstday,false)
            }


          scope.init(new Date(),true);

        }

    };
});
