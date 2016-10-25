//
//  AppDelegate.m
//  TallyManager
//
//  Created by Apple on 16/10/10.
//  Copyright © 2016年 Apple. All rights reserved.
//

#import "AppDelegate.h"
#import "CachesFileManager.h"


@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    
    [self judgeIfFirstOpen];
    
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


#pragma mark-
#pragma mark Delegate



#pragma mark-
#pragma mark CustomMethod
- (void)judgeIfFirstOpen{
    
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    
    // 判断是否为首次打开
    
    BOOL judge = [user objectForKey:@"firstOpen"];
    CachesFileManager *cache = [CachesFileManager new];
    if (!judge) { //首次打开
        
        [cache cacheFileGetWhenSuccessful:^{ //下载完数据之后代打开window
            
            [self.window makeKeyAndVisible];
            [user setObject:@"1" forKey:@"firstOpen"];
            
            //下载好之后取得版本号 保存版本号
            [cache judgeAppVersion:^(NSString *version) {
                [user setObject:version forKey:@"appVersion"];
            }];
        }];
    } else {
        [self.window makeKeyAndVisible];
        // 判断版本号是否更新
        {
            NSString *versionOfLocal = [user objectForKey:@"appVersion"];
            [cache judgeAppVersion:^(NSString *version) {
                
                if (![version isEqualToString:versionOfLocal]) { //不是同一个版本, 更新版本
                    
                    
                    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"检测到新的APP版本" message:@"去更新一下吧" preferredStyle:UIAlertControllerStyleAlert];
                    [alert addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
                        
                    }]];
                    [alert addAction:[UIAlertAction actionWithTitle:@"好的" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
                        
                        [cache cacheFileGetWhenSuccessful:^{
                            //刷新窗口
                            [[NSNotificationCenter defaultCenter] postNotificationName:@"ReloadData" object:nil];
                            //更新系统版本
                            [user setObject:version forKey:@"appVersion"];
                            
                        }];
                    }]];
                    
                    [self.window.rootViewController presentViewController:alert animated:YES completion:nil];
                    
                }
            }];
        }
    }
}

#pragma mark-
#pragma mark getter && setter

- (UIWindow *)window
{
    if (!_window) {
        _window = [[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
        UIViewController *view = [UIViewController new];
        
        _window.rootViewController = view;
    }
    return _window;
}

@end
