//
//  CachesFileManager.h
//  TallyManager
//
//  Created by Apple on 16/10/25.
//  Copyright © 2016年 Apple. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CachesFileManager : NSObject



- (void)cacheFileGetWhenSuccessful:(void(^)())block;



- (void)judgeAppVersion:(void(^)(NSString *version))block;

@end
