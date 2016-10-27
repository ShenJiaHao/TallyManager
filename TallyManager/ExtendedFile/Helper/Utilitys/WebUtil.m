//
//  WebUtil.m
//  TallyManager
//
//  Created by sense on 16/10/12.
//  Copyright © 2016年 Apple. All rights reserved.
//

#import "WebUtil.h"
#import "WebViewJavascriptBridge.h"
#import "DappOCMethodClass.h"

@interface WebUtil()

@property (nonatomic) DappOCMethodClass *dapp;

@end

@implementation WebUtil

//
- (void)setCallHandlerForWeb:(UIWebView *)web data:(id)data
{
    [WebViewJavascriptBridge enableLogging];
    if (!self.bridge) {
        //实例化WebViewJavascriptBridge并且带上一个UIWebView
        self.bridge = [WebViewJavascriptBridge bridgeForWebView:web];
//        [self.bridge setWebViewDelegate:web.delegate];
    }
    
    // OC => JS => OC
    [self.bridge callHandler:@"testJavascriptHandler" data:data responseCallback:^(id responseData) {
        NSLog(@"网页反馈 : %@",responseData);
        
//        NSData *dataDic = [NSData dataWithData:responseData];
//        NSDictionary *dic = (NSDictionary *)dataDic;
//        NSArray *array = [dic objectForKey:@"data"];
        
        
    }];
}


- (void)setRegisterHandlerForWeb:(UIWebView *)web
{
    [WebViewJavascriptBridge enableLogging];
    

    // JS => OC => JS
    // 获取当前配置的服务器地址
    [self.bridge registerHandler:@"bridge_GetWebRoot" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"获取当前配置的服务器地址:%@",data);
        
//        NSData *dataDic = [NSData dataWithData:data];
//        NSDictionary *dic = (NSDictionary *)dataDic;
        
        responseCallback([self.dapp getWebRoot]);
    }];

    // 判断网络状态
    [self.bridge registerHandler:@"bridge_CheckNetState" handler:^(id data, WVJBResponseCallback responseCallback) {
        
        // 0表示未联网，1表示以联网
//        NSString *stats = [_dapp CheckNetState];
//        responseCallback(@"0");

        NSString *stats = [self.dapp CheckNetState];
        
        responseCallback(stats);

    }];
    
    // 显示系统提示框
    [self.bridge registerHandler:@"bridge_ShowToast" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"显示系统提示框:%@",data);
        
        //注释掉这一行 因为传过来的文字是str 不用data解析
        
        // 解析网页传过来的数据
//        NSData *dataDic = [NSData dataWithData:data];
////        NSDictionary *dic = (NSDictionary *)dataDic;
//        NSString *str = [[NSString alloc]initWithData:dataDic encoding:NSUTF8StringEncoding];
//        NSLog(@"要显示的文字是: %@", str);
        [self.dapp ShowToast:data];
        
        responseCallback(@"");
    }];
    
    // 获取当前壳模型
    [self.bridge registerHandler:@"bridge_GetAppType" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"开始获取app信息");
        responseCallback([self.dapp GetAppType]);
    }];
    
    // 跳转本地H5页面
    [self.bridge registerHandler:@"bridge_LoadLocalUrl" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"跳转本地H5页面%@",data);
        
//        NSData *dataDic = [NSData dataWithData:data];
////        NSDictionary *dic = (NSDictionary *)dataDic;
//        NSString *str = [[NSString alloc]initWithData:dataDic encoding:NSUTF8StringEncoding];
//        NSLog(@"跳转本地H5页面为:%@", str);
        
        [self.dapp LoadLocalUrl:data webView:web];
        responseCallback(@"");
    }];
    //设置服务器地址
    [self.bridge registerHandler:@"bridge_SetWebRoot" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"设置服务器地址:%@",data);
        
//        NSData *dataDic = [NSData dataWithData:data];
//        NSString *str = [[NSString alloc]initWithData:dataDic encoding:NSUTF8StringEncoding];
        [self.dapp SetWebRoot:data];
        responseCallback(@"");
    }];
}

- (DappOCMethodClass *)dapp
{
    if (!_dapp) {
        _dapp = [[DappOCMethodClass alloc]init];
    }
    return _dapp;
}

@end
