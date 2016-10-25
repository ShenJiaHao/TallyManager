//
//  WebUtil.h
//  TallyManager
//
//  Created by sense on 16/10/12.
//  Copyright © 2016年 Apple. All rights reserved.
//

#import <Foundation/Foundation.h>
@class WebViewJavascriptBridge,UIWebView;

@interface WebUtil : NSObject

@property WebViewJavascriptBridge *bridge;

- (void)setRegisterHandlerForWeb:(UIWebView *)web;


- (void)setCallHandlerForWeb:(UIWebView *)web data:(id)data;


@end
