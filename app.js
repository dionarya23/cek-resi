new Vue({
  el: '#app',
  data : {
    noResi: '',
    layanan: '',
    manifest: ''
  },
  methods: {
      cek : function(){

          if(this.noResi !== '' && this.layanan !== ''){

            this.tampilkan('loading');
            var endPoint = 'https://wahidganteng.ga/process/api/470e9ccb4849637a807a4498a31946a9/cek-resi?jasa='+this.layanan+'&resi='+this.noResi;
            this.$http.get(endPoint).then(res => {
                if(res.body.status === 'sukses'){

          this.hilangkan('loading');
          document.getElementById('resinya').innerHTML = res.body.gen_info.awb;
          document.getElementById('tanggal').innerHTML = res.body.gen_info.date;
          document.getElementById('service').innerHTML = res.body.gen_info.service;
          document.getElementById('by').innerHTML = res.body.gen_info.shipper;
          document.getElementById('to').innerHTML = res.body.gen_info.receiver;
            this.manifest = res.body.manifest;
            this.tampilkan('datanya');
                }else{
                  this.noResi = ''
                  this.layanan = ''
                  alert("Resi Tidak Di temukan");
                }
            });
          }else{
            alert("Tidak Boleh Kosong");
          }


      },
      tampilkan: function(id){
        document.getElementById(id).classList.remove('hilang');
      },
      hilangkan: function(id){
        document.getElementById(id).classList.add('hilang');
      }
  } //end of methods
});

Vue.http.options.emulateJSON = true;
