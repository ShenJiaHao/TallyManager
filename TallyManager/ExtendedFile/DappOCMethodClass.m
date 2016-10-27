//
//  DappOCMethodClass.m
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
#import "DappOCMethodClass.h"
#import "Reachability.h"
#import <UIKit/UIKit.h>

#import "SSZipArchive/SSZipArchive.h"


@interface DappOCMethodClass()
    /**
     * 判断网络状态
     */
@property (nonatomic) Reachability *internetReachability;

@end

@implementation DappOCMethodClass
    
#pragma mark-
#pragma mark CustomMethod
- (instancetype)init{
    self = [super init];
    if (!self) {
        self = [DappOCMethodClass new];
    }
    return self;
}
/**
 * 返回字符串，获取当前配置的服务器地址
 */
- (NSString *)getWebRoot{
    NSString *rootUrl = [NSString new];
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    NSString * judge = [user stringForKey:@"rootUrl"];
    
    rootUrl = judge ? judge : @"csywhty2010.f3322.org:8005";
    [user setObject:rootUrl forKey:@"rootUrl"];
    return rootUrl;
}
/**
 * 返回字符，判断当前的网络状态，0表示未联网，1表示以联网
 */
- (NSString *)CheckNetState
{
    BOOL judge = self.internetReachability.currentReachabilityStatus;
    
    return judge ? @"1" : @"0";
}
/**
 * 显示系统模式的提示框
 */
- (void)ShowToast: (NSString *)str{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:nil message:str preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
    [alert addAction:cancelAction];
    
    [[[UIApplication sharedApplication].delegate window].rootViewController presentViewController:alert animated:YES completion:nil];
    
}
/**
 * 返回字符串，获取当前壳类型，apple,android
 */
- (NSString *)GetAppType
{
    return @"apple";
}
/**
 * 跳转至本地h5页面，url为本地h5页面的路径
 */
- (void)LoadLocalUrl:(NSString *)url webView:(UIWebView *)web{
    
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    BOOL judge = [user objectForKey:@"firstOpen"];
    NSString *path;
    if (!judge) { //首次打开
        path = [[NSBundle mainBundle] resourcePath];//
    } else
    {
        path = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
    }
    
    NSString *path1 =[NSString stringWithFormat:@"%@%@%@",path,@"/assets/", url];
    
    //     NSURL *baseURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] bundlePath]];
    NSURL *baseURL = [NSURL fileURLWithPath:path1];
    
    //    NSString *path2= @"/Users/fgtk/Desktop/HTML_3/HTML_3/新手帮助/index.html";
    
    NSLog(@"%@",path1);  //
    NSString *html = [NSString stringWithContentsOfFile:path1 encoding:NSUTF8StringEncoding error:nil];
    
    [web loadHTMLString:html baseURL:baseURL];
}
/**
 * 设置服务器地址
 */
- (void)SetWebRoot:(NSString *) str{
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    NSString *newStr = [NSString stringWithString:str];
    [user removeObjectForKey:@"rootUrl"];
    [user setObject:newStr forKey:@"rootUrl"];
    NSString *temp = [user objectForKey:@"rootUrl"];
    
    NSLog(@"服务器地址为 %@", temp);
    
}
    

#pragma mark-
#pragma mark Setter&&Getter
- (Reachability *)internetReachability
{
    if (!_internetReachability) {
        _internetReachability = [Reachability reachabilityForInternetConnection];
//            [_internetReachability startNotifier];
    }
    return _internetReachability;
}
@end
