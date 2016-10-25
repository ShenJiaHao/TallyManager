//
//  DappOCMethodClass.h
//  TallyManager
//
//  Created by Apple on 16/10/13.
//  Copyright © 2016年 Apple. All rights reserved.
//
/*
 a)    GetWebRoot()，返回字符串，获取当前配置的服务器地址
 b)    CheckNetState()，返回字符，判断当前的网络状态，0表示未联网，1表示以联网
 c)    ShowToast(string msg)，无返回值，显示系统模式的提示框，如果不支持该接口，程序会直接调用alert
 d)    GetAppType()，返回字符串，获取当前壳类型，apple,android
 e)    LoadLocalUrl(string url)，跳转至本地h5页面，url为本地h5页面的路径
 f)     SetWebRoot(string webroot)，设置服务器地址
 
 */
#import <Foundation/Foundation.h>
@class UIWebView;
@interface DappOCMethodClass : NSObject

/**
 * 返回字符串，获取当前配置的服务器地址
 */
- (NSString *)getWebRoot;
/**
 * 返回字符，判断当前的网络状态，0表示未联网，1表示以联网
 */
- (NSString *)CheckNetState;
/**
 * 显示系统模式的提示框
 */
- (void)ShowToast: (NSString *)str;
/**
 * 返回字符串，获取当前壳类型，apple,android
 */
- (NSString *)GetAppType;
/**
 * 跳转至本地h5页面，url为本地h5页面的路径
 */
- (void)LoadLocalUrl:(NSString *)url webView:(UIWebView *)web;
/**
 * 设置服务器地址
 */
- (void)SetWebRoot: (NSString *)str;


    
    
@end
