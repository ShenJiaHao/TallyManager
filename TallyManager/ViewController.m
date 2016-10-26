//
//  ViewController.m
//  TallyManager
//
//  Created by Apple on 16/10/10.
//  Copyright © 2016年 Apple. All rights reserved.
//

#import "ViewController.h"
#import <JavaScriptCore/JavaScriptCore.h>

#import "WebUtil.h"

@interface ViewController ()<UIWebViewDelegate>
@property (nonatomic, strong)UIWebView *webView;
@property (nonatomic, retain)WebUtil *webHandler;

@end

@implementation ViewController



- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self.view addSubview:self.webView];
    
    [self builtLayoutView];
    
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(reloadAction:) name:@"ReloadData" object:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark-
#pragma mark CustomMethod


- (void)reloadAction:(id)obj{
    
    NSString *path = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
    
    NSString *path1 =[NSString stringWithFormat:@"%@%@",path,@"/assets/Login.html"];
    NSURL *baseURL = [NSURL fileURLWithPath:path1];
    NSLog(@"%@",path1);  //
    NSString *html = [NSString stringWithContentsOfFile:path1 encoding:NSUTF8StringEncoding error:nil];
    [_webView loadHTMLString:html baseURL:baseURL];
    
}


- (void)builtLayoutView{
    
    //    UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    //    [backButton addTarget:self action:@selector(backButtonAction:) forControlEvents:UIControlEventTouchUpInside];
    //    backButton.frame = CGRectMake(0, DLHeight - 60, 60, 60);
    //    backButton.backgroundColor = [UIColor blackColor];
    //    [backButton setTitle:@"return" forState:UIControlStateNormal];
    //    [backButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    //    [self.view addSubview:backButton];
}

- (void)backButtonAction:(UIButton *)sender
{
    [self.webView canGoBack] ? [self.webView goBack] : nil;
    
}

#pragma mark-
#pragma mark DelegateMethod


- (void)webViewDidStartLoad:(UIWebView *)webView
{
    
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
    
//    NSString *path = [[NSBundle mainBundle] resourcePath];//pathForResource:@"index" ofType:@"html"
    
    //    NSString *path1 =[NSString stringWithFormat:@"%@%@",path,@"/assets/js/dapp.js"];
    //
    //    JSContext *context = [self.webView valueForKeyPath:path1];
    //
    //    //定义好JS要调用的方法, share就是调用的share方法名
    //    context[@"LoadLocalUrl"] = ^() {
    //        NSLog(@"+++++++Begin Log+++++++");
    //        NSArray *args = [JSContext currentArguments];
    //
    //        dispatch_async(dispatch_get_main_queue(), ^{
    //            UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"方式二" message:@"这是OC原生的弹出窗" delegate:self cancelButtonTitle:@"收到" otherButtonTitles:nil];
    //            [alertView show];
    //        });
    //
    //        for (JSValue *jsVal in args) {
    //            NSLog(@"%@", jsVal.toString);
    //        }
    //
    //        NSLog(@"-------End Log-------");
    //    };
    
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    NSLog(@"html请求错误码为 %ld ", (long)[error code]);
    
    if([error code] == NSURLErrorCancelled)  {
        return;
    }
    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
    
    // report the error inside the webview
    //    NSString* errorString = [NSString stringWithFormat:
    //                             @"<html><center><font size=+5 color='red'>An error occurred:<br>%@</font></center></html>",
    //                             error.localizedDescription];
    //
    //    [self.webView loadHTMLString:errorString baseURL:nil];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSLog(@"请求的scheme为 %@",request.URL.scheme);
    NSURL *url = request.URL;
    
    //    if (![url.scheme isEqualToString:@"file"]) {
    //        if ([[url scheme] isEqualToString:@"http"] || [[url scheme] isEqualToString:@"https"]) {
    ////            NSLog(@"发起的网络请求链接为 %@", url);
    ////            [[UIApplication sharedApplication] openURL:url];
    ////            [webView loadRequest:[NSURLRequest requestWithURL:url]];
    ////            url.host = @"www";
    //            return NO;
    //        }
    //        else {
    //            return [ self webView:webView shouldStartLoadWithRequest:request navigationType:navigationType ];
    //        }
    //    }
    
    // 这里可以看到 每次点击网页所触发的类型,也可以看到每次跳转的请求
    NSLog(@"点击类型:%ld",navigationType);
    NSLog(@"请求url:%@",request.URL.absoluteString);
    return YES;
}


#pragma mark-
#pragma mark getter && setter
- (UIWebView *)webView
{
    if (!_webView) {
        _webView = [[UIWebView alloc]initWithFrame:CGRectMake(0, 0, DLWidth, DLHeight)];
        _webView.delegate = self;
        _webView.backgroundColor = [UIColor clearColor];
        //        NSString* url = [[NSBundle mainBundle] pathForResource:@"Login" ofType:@"html" inDirectory:@"assets"];
        //        [_webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:url]]];
        
        
        NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
        
        NSString *path;
        
        BOOL judge = [user objectForKey:@"firstOpen"];
        if (!judge) { //首次打开
            path = [[NSBundle mainBundle] resourcePath];//
        } else
        {
            path = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
        }
        
        NSString *path1 =[NSString stringWithFormat:@"%@%@",path,@"/assets/Login.html"];
        NSURL *baseURL = [NSURL fileURLWithPath:path1];
        NSLog(@"%@",path1);  //
        NSString *html = [NSString stringWithContentsOfFile:path1 encoding:NSUTF8StringEncoding error:nil];
        [_webView loadHTMLString:html baseURL:baseURL];
        [_webView stringByEvaluatingJavaScriptFromString:@""];
        
        // 建立通信桥
        self.webHandler = [[WebUtil alloc]init];
        [_webHandler setCallHandlerForWeb:_webView data:nil];
        [_webHandler setRegisterHandlerForWeb:_webView];
    }
    return _webView;
}



@end
