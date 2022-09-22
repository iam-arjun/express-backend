        let find_temp = document.getElementById('sub_btn');
        find_temp.addEventListener('click', get_data)
        let city_name = document.getElementById('search_val')


        async function get_data() {


            try {
                let city_val = city_name.value;



                let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&appid=f856617bc9617b703c81c947726d25d5&units=metric`;
                console.log("hello");
                let mydata = await fetch(url);

                let data_obj = await mydata.json();
                let arr_obj = [data_obj];
                let temperature = arr_obj[0].main.temp;
                let temp_value = document.getElementById('temp');

                temp_value.innerText = temperature;
                let final_city = document.getElementById('cityName');
                final_city.innerText = city_name.value;
                document.getElementById('celsius').classList.remove('hide');
            }
            catch {
                console.log("ERROR IN FETCHING DATA")
            }
        }
