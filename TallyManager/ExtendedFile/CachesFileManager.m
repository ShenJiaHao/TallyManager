//
//  CachesFileManager.m
//  TallyManager
//
//  Created by Apple on 16/10/25.
//  Copyright © 2016年 Apple. All rights reserved.
//

#import "CachesFileManager.h"
#import "SSZipArchive.h"
#import "AFNetworking.h"

@interface CachesFileManager() <SSZipArchiveDelegate>

@end



@implementation CachesFileManager

- (void)judgeAppVersion:(void(^)(NSString *version))block{
    
    
    NSString *str = @"http://csywhty2010.f3322.org:8005/Mobile/API/ios_ver.ashx";
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    manager.responseSerializer = [AFHTTPResponseSerializer serializer];
    
    //以get的形式提交，只需要将上面的请求地址给GET做参数就可以
    [manager GET:str parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        // 隐藏系统风火轮
        
        //json解析
        NSString *version = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        
        block(version);
        
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        
        
        
    }];
    
}

- (void)cacheFileGetWhenSuccessful:(void(^)())block{
    
    
    NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
    AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:config];
    
    NSString *urlString = @"http://csywhty2010.f3322.org:8005/Mobile/API/assets.zip";
    
    NSURL *url = [NSURL URLWithString:urlString];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    
    NSURLSessionDownloadTask *task = [manager downloadTaskWithRequest:request progress:nil destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
        // 指定下载文件保存的路径
        //        NSLog(@"%@ %@", targetPath, response.suggestedFilename);
        // 将下载文件保存在缓存路径中
        NSString *cacheDir = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
        NSString *path = [cacheDir stringByAppendingPathComponent:response.suggestedFilename];
        
        // URLWithString返回的是网络的URL,如果使用本地URL,需要注意
        NSURL *fileURL1 = [NSURL URLWithString:path];
        NSURL *fileURL = [NSURL fileURLWithPath:path];
        
        NSLog(@"== %@ |||| %@", fileURL1, fileURL);
        
        return fileURL;
    } completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
        NSLog(@"%@ %@", filePath, error);
        NSFileManager *man = [NSFileManager defaultManager];
        NSString *cacheDir = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
        [man removeItemAtPath:[NSString stringWithFormat:@"%@/assets", cacheDir] error:nil];
        
        [SSZipArchive unzipFileAtPath:[NSString stringWithFormat:@"%@/assets.zip", cacheDir]
                        toDestination:[NSString stringWithFormat:@"%@/", cacheDir]
                      progressHandler:^(NSString * _Nonnull entry, unz_file_info zipInfo, long entryNumber, long total) {
            
        } completionHandler:^(NSString * _Nonnull path, BOOL succeeded, NSError * _Nonnull error) {
            [man removeItemAtPath:[NSString stringWithFormat:@"%@/assets.zip", cacheDir] error:nil];
            block();
        }];
    }];
    
    [task resume];
    
    
}
//判断临时文件夹是否存在

@end
