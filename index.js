// const { count } = require('console');
const { count } = require('console');
// const fs=require('fs');
const express = require('express');
const nodemailer = require('nodemailer');
const { createServer } = require('http');
const { Server } = require('socket.io');
const now = new Date();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let countdown = 240; // Initial countdown value in seconds
// let endingtimer=120;
// let timerInterval; // Variable to store the timer interval
var cmax=0;
var cuser="--";
var cuserdatabaseid=""; 
var cuserdatabaseemail="";
var cuserdatabasenumber="";
var cuuid="";
var sold=true;
var userslist=[];
var sendnotif=true;
var hours = now.getHours();
console.log(hours);
async function sendEmail(winneremail,sellername,sellernumber,selleremail,dateofauction,timeofauction) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'karnatigeetha611@gmail.com', // your email
                pass: 'uuyshyqfyqinmrfv', // your email app password
            },
        });

        const info = await transporter.sendMail({
            from: '"LiveAuction" <karnatigeetha611@gmail.com>', // sender address
            to: winneremail, // list of receivers
            subject: 'Congratulations from LiveAuction', // Subject line
            text: `Dear user,

We heartfully congratulate you for participating and winning the auction conducted by LiveAuction on ${dateofauction} from ${timeofauction}:00 to ${timeofauction+1}:00 (IST).

Here are the details of the seller of the item:
Name:${sellername},
Mobile Number:${sellernumber},
Email:${selleremail}

Thank you for choosing LiveAuction. We are dedicated to providing you with the best possible service.
            
Regards
Team LiveAuction`, // plain text body
        });

        console.log('Email sent successfully: %s', info.messageId);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}






async function sellermail(seller) {
    if(sold==true){
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'karnatigeetha611@gmail.com', // your email
                    pass: 'uuyshyqfyqinmrfv', // your email app password
                },
            });
    
            const info = await transporter.sendMail({
                from: '"LiveAuction" <karnatigeetha611@gmail.com>', // sender address
                to: seller, // list of receivers
                subject: 'LiveAuction', // Subject line
                text: `Dear user,
Your item was successfully auctioned in our app LiveAuction.

Here are the details of the buyer of the item:
Name:${cuser},
Mobile Number:${cuserdatabasenumber},
Email:${cuserdatabaseemail}
                
Thank you for choosing LiveAuction. We are dedicated to providing you with the best possible service.    
                
Regards
Team LiveAuction`, // plain text body
            });

            console.log('Email sent successfully: %s', info.messageId);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }else{
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'karnatigeetha611@gmail.com', // your email
                    pass: 'uuyshyqfyqinmrfv', // your email app password
                },
            });
    
            const info = await transporter.sendMail({
                from: '"LiveAuction" <karnatigeetha611@gmail.com>', // sender address
                to: seller, // list of receivers
                subject: 'LiveAuction', // Subject line
                text: `Dear user,
We regret to inform you that the item you uploaded to our LiveAuction app did not receive any bids.          

Regards
Team LiveAuction`, // plain text body
            });
    
            console.log('Email sent successfully: %s', info.messageId);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }

}




async function notifmail(usermail) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'karnatigeetha611@gmail.com', // your email
                pass: 'uuyshyqfyqinmrfv', // your email app password
            },
        });

        const info = await transporter.sendMail({
            from: '"LiveAuction" <karnatigeetha611@gmail.com>', // sender address
            to: usermail, // list of receivers
            subject: 'Congratulations from LiveAuction', // Subject line
            text: `Dear user,

Your auction is scheduled tomorrow;

Thank you for choosing LiveAuction. We are dedicated to providing you with the best possible service.
            
Regards
Team LiveAuction`, // plain text body
        });

        console.log('Email sent successfully: %s', info.messageId);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}




async function sellerconfirmemail(usermail) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'karnatigeetha611@gmail.com', // your email
                pass: 'uuyshyqfyqinmrfv', // your email app password
            },
        });

        const info = await transporter.sendMail({
            from: '"LiveAuction" <karnatigeetha611@gmail.com>', // sender address
            to: usermail, // list of receivers
            subject: 'Congratulations from LiveAuction', // Subject line
            text: `Dear user,

Your product was accepted by the administrator.

Thank you for choosing LiveAuction. We are dedicated to providing you with the best possible service.
            
Regards
Team LiveAuction`, // plain text body
        });

        console.log('Email sent successfully: %s', info.messageId);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}


async function sellerdeleteemail(usermail) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'karnatigeetha611@gmail.com', // your email
                pass: 'uuyshyqfyqinmrfv', // your email app password
            },
        });

        const info = await transporter.sendMail({
            from: '"LiveAuction" <karnatigeetha611@gmail.com>', // sender address
            to: usermail, // list of receivers
            subject: 'LiveAuction', // Subject line
            text: `Dear user,

We regret to inform you that your product has been declined by the administrator.

Thank you for choosing LiveAuction. We are dedicated to providing you with the best possible service.
            
Regards
Team LiveAuction`, // plain text body
        });

        console.log('Email sent successfully: %s', info.messageId);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

// if (!timerInterval) {
//     // Decrement timer every second and emit to all clients
//     timerInterval = setInterval(() => {
//         countdown--;
//         // endingtimer--;
//     }, 1000);
// }


setInterval(() => {
    countdown--;
    // endingtimer--;
    if(hours==8){
        // console.log("inside hours");
        if(sendnotif){
            console.log("inside sendnotif");
            for (let i = 0; i < userslist.length; i++) {
                notifmail(userslist[i]);
            }
        }
        sendnotif=false;
    }else{
        sendnotif=true;
    }
}, 1000);





app.post("/some", function(req, res) {
    // Extract the dataList from the request body
    const dataList = req.body.dataList;
    userslist=req.body.dataList;
    console.log("Received dataList:", dataList);
    sendnotif=true;
    // Process the dataList as needed

    res.sendStatus(200); // Send a response back to the Flutter app
});


app.post("/sellerconfirm", function(req, res) {
    // Extract the dataList from the request body
    sellerconfirmemail(req.body.selleremail);
    // Process the dataList as needed

    res.sendStatus(200); // Send a response back to the Flutter app
});

app.post("/sellerdelete", function(req, res) {
    // Extract the dataList from the request body
    sellerdeleteemail(req.body.selleremail);
    // Process the dataList as needed

    res.sendStatus(200); // Send a response back to the Flutter app
});



io.on('connection', (socket) => {
    socket.join("anonymous_group");
    console.log('connected with backend');
    
    // Emit initial countdown value to the client
    io.to("anonymous_group").emit("timer", countdown);
    // io.to("anonymous_group").emit("endingtimer", endingtimer);
    

    setInterval(() => {
                    io.to("anonymous_group").emit("timer", countdown);
                    // io.to("anonymous_group").emit("endingtimer", endingtimer);
                    if(countdown==0){
                        io.to("anonymous_group").emit("auctionover",{"value":cmax,"user":cuser,"userid":cuuid,"databaseidofuser":cuserdatabaseid});
                    }
                    // if(endingtimer==0){
                    //     io.to("anonymous_group").emit("auctionover",{"value":cmax,"user":cuser,"userid":cuuid,"databaseidofuser":cuserdatabaseid});
                    // }
                    if ((countdown <= -2)) {
                        const room = io.sockets.adapter.rooms.get("anonymous_group");
                        if (room) {
                            room.forEach(socketId => { 
                                const socket = io.sockets.sockets[socketId];
                                if (socket) {
                                    socket.disconnect(true);
                                }
                            });
                        }
                        // clearInterval(timerInterval); // Stop the timer interval
                        // timerInterval = null; // Reset timerInterval variable
                        countdown = 3600; // Reset countdown to initial value
                        // endingtimer=120;
                    }
                    io.to("anonymous_group").emit("sendMsgServer",{"value":cmax,"user":cuser,"userid":cuuid});
                }, 1000);


    // Reset the timer when a new user connects
    socket.on('disconnect', () => {
        console.log("Disconnected");
        socket.leave("anonymous_group");
    });

    socket.on('baseprice',(message)=>{
        cmax=message['base'];
    });


    socket.on('sendMessage',(message)=>{
        console.log("this is the message",message);
        // socket.emit("sendMsgServer",message);  //only to one particular user
        console.log(cmax);
        console.log(message['value']);
        if(cmax<=(message['value'])){
            sold=true;
            cmax=(message['value']);
            cuser=message['user'];
            cuserdatabaseid=message['databaseid'];
            cuserdatabaseemail=message['databaseemail'];
            cuserdatabasenumber=message['databasenumber'];
            cuuid=message['userid'];
            // endingtimer = 120;
        }
        // io.to("anonymous_group").emit("sendMsgServer",{"value":Math.max(cmax,message['value']),"user":cuser});
    });

    socket.on('sendemail',(message)=>{
        console.log("this is the message",message);
        sendEmail(cuserdatabaseemail,message['sellername'],message['sellernumber'],message['selleremail'],message['dateofauction'],message['timeofauction']);
    });
});

// httpServer.listen(3000);
httpServer.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});
