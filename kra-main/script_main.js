let location_ = '(서울)';
let date = today();
let video = 'r';
let buttons = null;
let raceNum = null;


let selectedDate = null;
let noRace = document.querySelector('.noRace');
let params = (new URL(document.location)).searchParams; 
let race = params.get("race"); // 웹사이트 파라미터 ?race="2023.08.22_s1r" 형식으로 전달

if (race !== null) {
    video = race[race.length - 1]; // 문자열 "2023.08.22_s1r" 에서 r 추출
    date = race.split('_')[0]; // "2023.08.22_s1r" 에서 "2023.08.22" 추출
    raceNum = race.split('_')[1].replace(/\D/g, ''); // "s1r" 에서 숫자만 남기고 문자 제거

    let initial = race.split('_')[1][0]; // "2023.08.22_s1r" 에서 s(지역) 추출
    if (initial === 's'){
        changeLocation('(서울)');
    }
    else if (initial === 'b'){
        changeLocation('(부산)');
    }
    else if (initial === 'j'){
        changeLocation('(제주)');
    }
    
    let newdate = `${location_} ${date}`;
    console.log(newdate)
    
    let raceBtns = document.querySelectorAll('#raceBtn')  // 경주 버튼들을 가져온 뒤 
    for (let i = 0; i <= raceBtns.length-1; i++){
            raceBtns[i].style.backgroundColor = ''; // 색깔 없애고
        };
    
    raceBtnRenderer(newdate).then(() => {
        let button = document.querySelector(`.raceNumBtn-${raceNum}`);
        button.style.backgroundColor = '#fcb9c0';
        button.click();  // 자동 클릭
        
        
        let buttons = document.querySelectorAll('.raceNumBtn');
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.style.backgroundColor = '';
            }
        });
    });
}



function today(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); 
    var day = ("0" + date.getDate()).slice(-2); 
    var formattedDate = year + '.' + month + '.' + day;
    return formattedDate; // Output: "2023.08.04"
} 


function changeVideo(videoId) { 
    document.getElementById('ytplayer').src = `https://www.youtube.com/embed/${videoId}?vq=hd1080&rel=0&autoplay=1`;
}


function changeLocation(loc) {
    location_ = loc;
    
    if (location_ === '(서울)'){
        document.querySelector('#seoul').className += " active";
        document.querySelector('#busan').className = 'locationBtn';
        document.querySelector('#jeju').className = 'locationBtn';
    }
    else if (location_ === '(부산)'){
        document.querySelector('#busan').className += " active";
        document.querySelector('#seoul').className = 'locationBtn';;
        document.querySelector('#jeju').className = 'locationBtn';
    }
    else if (location_ === '(제주)'){
        document.querySelector('#jeju').className += " active";
        document.querySelector('#busan').className = 'locationBtn';
        document.querySelector('#seoul').className = 'locationBtn';
    }
    
    document.querySelector("#result").value = "날짜를 선택하세요.";
    let btnElements = document.querySelectorAll('#raceBtn');
        for (let i = 0; i <= btnElements.length-1; i++){
            btnElements[i].style.display = 'none';
        };
}


function raceBtnRenderer(date){
    return new Promise((resolve, reject) => {
        fetch('data.json') 
            .then(response => response.json())
            .then(data => {
                for (let key in data) {
                      if (key.includes(date)) {         
                        num = key.split(" ").pop();
                        let videoBtn = document.querySelector(`.raceNumBtn-${num}`); 
                        videoBtn.style.display = 'block'; 
                        let videoURL = data[key]; 
                        var temp = new URL(videoURL, 'http://dummy.com');
                        var videoID = temp.searchParams.get("v");
                        console.log('비디오 아이디',videoID);
                        videoBtn.setAttribute('onclick', `changeVideo("${videoID}")`);
                        noRace.style.display = 'none';
                      }
                }
                buttons = document.querySelectorAll('[id="raceBtn"]');
                var selectedButton;
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].addEventListener('click', function(event) {
                        if (selectedButton) selectedButton.style.backgroundColor = '';  // Reset the color of the previously clicked button
                        selectedButton = event.target;  // Update the selected button
                        selectedButton.style.backgroundColor = '#fcb9c0';  // Change the color of the clicked button
                    });
                }

                resolve();
            });
    });
}


$(function() {

    var calendar = rome(inline_cal, {time: false, inputFormat: 'YYYY.MM.DD'});
    calendar.on('data', run);   
    if (date !== null) {
        calendar.setValue(date);
        run(date);
    }

    function run(date){

        let btnElements = document.querySelectorAll('#raceBtn');
        for (let i = 0; i <= btnElements.length-1; i++){
            btnElements[i].style.backgroundColor = '';
            btnElements[i].style.display = 'none';
        };

        noRace.style.display = 'block';
        result.value = date;
        selectedDate = document.querySelector("#result").value; // '2023.08.22' (달력에서 선택된 날짜)
        let selectedDate_L = `${location_} ${selectedDate}`; //'(서울) 2023.08.22' <- 지역 삽입
        document.querySelector("#result").value = selectedDate_L; //'id = result 요소에 '(서울) 2023.08.22' <- 지역 삽입

        raceBtnRenderer(selectedDate_L);



    }  


});





//function run(){
//	rome(inline_cal, {time: false, inputFormat: 'YYYY.MM.DD'}).on('data', function (value) {
//        
//        
//        let btnElements = document.querySelectorAll('#raceBtn');
//        for (let i = 0; i <= btnElements.length-1; i++){
//            btnElements[i].style.display = 'none';
//        };
//        let noRace = document.querySelector('.noRace');
//        noRace.style.display = 'block';
//        console.log(value);
//        result.value = value;
//        selectedDate = document.querySelector("#result").value; // '2023.08.22' (달력에서 선택된 날짜)
//        let selectedDate_L = `${location_} ${selectedDate}`; //'(서울) 2023.08.22' <- 지역 삽입
//        
//        document.querySelector("#result").value = selectedDate_L
//        if (location_ === '(서울)'){
//            document.querySelector("#result").style.backgroundColor = '#ffdeb0';
//        }
//        else if (location_ === '(부산)'){
//            document.querySelector("#result").style.backgroundColor = '#ffdeb0';
//        }
//        else if (location_ === '(제주)'){
//            document.querySelector("#result").style.backgroundColor = '#ffdeb0';
//        }
//        
//        fetch('data.json') // json 데이터 로드
//            .then(response => response.json())
//            .then(data => {
//            for (let key in data) {
//                  if (key.includes(selectedDate_L)) { // '(서울) 2023.08.22' 문구를 가진 key 가져오기 ((서울) 2023.08.22 10)         
//                    let num = key.split(" ").pop();// '(서울) 2023.08.22 10'에서 마지막 10(경주번호)만 가져오기
//                    let videoBtn = document.querySelector(`.raceNumBtn-${num}`); // 경주번호 버튼 활성화
//                    videoBtn.style.display = 'block'; // 경주번호 버튼 활성화
//                    let videoURL = data[key]; // "/watch?v=pIPS0G4jEKw&list=PLXnQjO8hP71yKdjyTCQAonjYPCa3S9qfq&index=19&pp=iAQB"
//                    var temp = new URL(videoURL, 'http://dummy.com');
//                    var videoID = temp.searchParams.get("v");// pIPS0G4jEKw
//                    videoBtn.setAttribute('onclick', `changeVideo("${videoID}")`);
//                    noRace.style.display = 'none';
//                  }
//            }
//            })
//            .catch((error) => {
//                console.error('Error:', error);
//            });        
//
//        var buttons = document.querySelectorAll('[id="raceBtn"]');
//        var selectedButton;
//
//        for(var i = 0; i < buttons.length; i++) {
//            buttons[i].addEventListener('click', function(event) {
//                if (selectedButton) selectedButton.style.backgroundColor = '';  // Reset the color of the previously clicked button
//                selectedButton = event.target;  // Update the selected button
//                selectedButton.style.backgroundColor = '#fcb9c0';  // Change the color of the clicked button
//            });
//        }
//
//        
//	});
//}
//
//run()




//$(function() { //동영상 버튼 생성 (달력의 날짜를 클릭하면 실행)
//
//	rome(inline_cal, {time: false, inputFormat: 'YYYY.MM.DD'}).on('data', function (value) {
//        
//        
//        let btnElements = document.querySelectorAll('#raceBtn');
//        for (let i = 0; i <= btnElements.length-1; i++){
//            btnElements[i].style.display = 'none';
//        };
//        let noRace = document.querySelector('.noRace');
//        noRace.style.display = 'block';
//        
//        result.value = value;
//        selectedDate = document.querySelector("#result").value; // '2023.08.22' (달력에서 선택된 날짜)
//        let selectedDate_L = `${location_} ${selectedDate}`; //'(서울) 2023.08.22' <- 지역 삽입
//        
//        document.querySelector("#result").value = selectedDate_L
//        if (location_ === '(서울)'){
//            document.querySelector("#result").style.backgroundColor = '#ffdeb0';
//        }
//        else if (location_ === '(부산)'){
//            document.querySelector("#result").style.backgroundColor = '#ffdeb0';
//        }
//        else if (location_ === '(제주)'){
//            document.querySelector("#result").style.backgroundColor = '#ffdeb0';
//        }
//        
//        fetch('data.json') // json 데이터 로드
//            .then(response => response.json())
//            .then(data => {
//            for (let key in data) {
//                  if (key.includes(selectedDate_L)) { // '(서울) 2023.08.22' 문구를 가진 key 가져오기 ((서울) 2023.08.22 10)         
//                    let num = key.split(" ").pop();// '(서울) 2023.08.22 10'에서 마지막 10(경주번호)만 가져오기
//                    let videoBtn = document.querySelector(`.raceNumBtn-${num}`); // 경주번호 버튼 활성화
//                    videoBtn.style.display = 'block'; // 경주번호 버튼 활성화
//                    let videoURL = data[key]; // "/watch?v=pIPS0G4jEKw&list=PLXnQjO8hP71yKdjyTCQAonjYPCa3S9qfq&index=19&pp=iAQB"
//                    var temp = new URL(videoURL, 'http://dummy.com');
//                    var videoID = temp.searchParams.get("v");// pIPS0G4jEKw
//                    videoBtn.setAttribute('onclick', `changeVideo("${videoID}")`);
//                    noRace.style.display = 'none';
//                  }
//            }
//            })
//            .catch((error) => {
//                console.error('Error:', error);
//            });        
//
//        var buttons = document.querySelectorAll('[id="raceBtn"]');
//        var selectedButton;
//
//        for(var i = 0; i < buttons.length; i++) {
//            buttons[i].addEventListener('click', function(event) {
//                if (selectedButton) selectedButton.style.backgroundColor = '';  // Reset the color of the previously clicked button
//                selectedButton = event.target;  // Update the selected button
//                selectedButton.style.backgroundColor = '#fcb9c0';  // Change the color of the clicked button
//            });
//        }
//
//        
//	});
//});








//let raceDate = null;
//let regex = /\d{4}\.\d{2}\.\d{2}/; // 정규 표현식을 이용해서 날짜 부분 추출 ex) (서울) 2023.08.12 1 -> 2023년 08월 12일
//let extractedDate = raceDate.match(regex)[0]; // 추출 "2023.03.12" 
//// "."을 기준으로 나누기
//let dateParts = extractedDate.split('.'); // ["2023", "03", "12"]
//
//// 새로운 날짜 형식으로 합치기
//let newFormatDate = `${dateParts[0]}년 ${dateParts[1]}월 ${dateParts[2]}일`; // "2023년 03월 12일"
//
//console.log(newFormatDate);
