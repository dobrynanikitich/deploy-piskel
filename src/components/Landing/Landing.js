import React from 'react';
import Header from '../Header/Header';

import piskelscreensot from '../../assets/piskelscreenshot.png';
import pentoolsettings from '../../assets/pentoolsettings.png';
import toolsoverview from '../../assets/toolsoverview.png';
import colorchoose from '../../assets/colorchoose.png';
import addnewframe from '../../assets/addnewframe.png';
import login from '../../assets/login.png';
import animationpreview from '../../assets/animationpreview.png';
import github from '../../assets/github.png';
// import gifex1 from '../../gifex1.gif';
// import gifex2 from '../../gifex2.gif';
// import gifex3 from '../../gifex3.gif';
// import gifex4 from '../../gifex4.gif';
import classes from './Landing.module.scss';

const Landing = () => (
    <div className={classes.LandingPage}>
        <header className={classes.LandingHeader}>
            <p className={classes.HeaderLandingName}>PISKEL CLONE</p>
            <a href='#/app' className={classes.LinkToApp}>GO TO APP!</a>
        </header>
        <section className={classes.PiskelOverview}>
            <p className={classes.PiskelDesc}>
                Piskel is a free online editor for animated sprites and pixel art
                Create animations in your browser.
                Try an example, use Google sign in to access your gallery or simply create a new sprite.
            </p>
            <div className={classes.PiskelSreenshotWrapper}>
                <img 
                    src={piskelscreensot} 
                    alt={'piskel app screenshot'}
                    className={classes.PiskelScreenshot}
                />
            </div>
        </section>
        <section className={classes.PiskelSprites}>
            <div className={classes.PiskelSpritesExample}>
            <img 
                src={require('../../assets/gifex1.gif')} 
                alt={'sprite1 example'} 
            />
            <img 
                src={require('../../assets/gifex2.gif')} 
                alt={'sprite2 example'} 
            />
            <img 
                src={require('../../assets/gifex3.gif')} 
                alt={'sprite3 example'} 
            />
            <img 
                src={require('../../assets/gifex4.gif')} 
                alt={'sprite4 example'} 
            />
            </div>
        </section>
        <section className={classes.PiskelFunctionality}>
            <ul className={classes.PiskelFunctionalityList}>
                <li>
                    <p>
                        Choose pen size and canvas size
                    </p>
                    <img
                        src={pentoolsettings}
                        alt={'pentoolsettings'}
                    ></img>
                </li>
                <li>
                    <img
                        src={toolsoverview}
                        alt={'toolsoverview'}
                    ></img>
                    <p>
                        Choose your favourite tools to make perfect piskel
                    </p>
                </li>
                <li>
                    <p>
                        Choose your favoutire colors and switch them
                    </p>
                    <img
                        src={colorchoose}
                        alt={'colorchoose'}
                    ></img>
                </li>
                <li>
                    <img
                        src={addnewframe}
                        alt={'addnewframe'}
                    ></img>
                    <p>
                        Add new frames, delete, copy and drag and drop in any order you like
                    </p>
                </li>
                <li>
                    <p>
                        Sign in with your google account
                    </p>
                    <img
                        src={login}
                        alt={'login'}
                    ></img>
                </li>
                <li>
                    <img
                        src={animationpreview}
                        alt={'animationpreview'}
                    ></img>
                    <p>
                        Animate frames and controll the animation speed
                    </p>
                </li>
            </ul>
        </section>
        <section className={classes.AuthorInfo}>
            <div className={classes.AuthorInfoWrapper}>
                <p>Developed by Mikita Nemau</p>
                <a href='https://github.com/dobrynanikitich' target="_blank">
                    <img src={github} alt={'mygithubaccount'}/>
                </a>
            </div>
        </section>
    </div>
)

export default Landing;