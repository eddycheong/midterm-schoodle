$('#document').ready(function(e){
  console.log("document loaded");
  $(function () {
    $("#datepicker").datepicker({
          todayHighlight: true,
          multidate: true,
          format: 'yyyy/mm/dd',
          startDate: '+0d'
      })
  });
}); //main function ends