//
//  JoinViewController.swift
//  webrtc-telehealth-embed-sdk-ios
//
//  Created by Ruairi Griffin on 1/04/22.
//

import Foundation
import Combine
import UIKit
import AVFoundation

class JoinViewController: UIViewController {
    @IBOutlet weak var jsonView: UIView!
    @IBOutlet weak var joinWithIDView: UIView!
    
    @IBOutlet weak var jsonTextView: UITextView!
    @IBOutlet weak var meetingIdField: UITextField!
    @IBOutlet weak var passcodeField: UITextField!
    @IBOutlet weak var nameField: UITextField!
    
    @IBOutlet weak var generatedJSONTextView: UITextView!
    @IBOutlet weak var tabSegmentedControl: UISegmentedControl!
    @IBOutlet weak var keyboardViewHeight: NSLayoutConstraint!
    
    var tab: Tab {
        if tabSegmentedControl.selectedSegmentIndex == 0 {
            return .joinWithJSON
        } else {
            return .joinWithID
        }
    }
    
    var subscriptions = Set<AnyCancellable>()
    
    let defaultJoinJSON = """
        {
            "type": "embedProxy.toProxy",
            "method" : "joinMeeting",
            "args": [{
                "meetingInfo": {
                    "meetingId": "",
                    "passcode": "",
                    "name": ""
                },
                "iFrameProps": {
                    "width": "100vw",
                    "height": "100vh",
                    "selectorId": ".iframeHolder"
                },
                "uiProps": {
                    "hideChatPanel": false,
                    "lockMeetingControls": false,
                    "hideCopyLink": false,
                    "hideRatingScreen": false,
                    "inMeetingBGConfig": {
                        "audioTileColor": "",
                        "containerColorOfAllTiles": ""
                    },
                    "locale": "en",
                    "teleHealthConfig": {
                        "skipCheckIn": true,
                        "backgroundColor": "linear-gradient(#6600CC, #6600FF)",
                        "welcomeText": "Welcome to the clinic!",
                        "waitingText": "Please wait for your provider",
                        "resources": {
                            "videos": {
                                "data": [
                                    {
                                        "title": "Video title",
                                        "thumbnailUrl": "https://vid.com",
                                        "url": "https://vid.com",
                                        "duration": "12:10"
                                    }
                                ]
                            }
                        }
                    }
                }
            }]
        }
    """
    
    private func changeTab() {
        switch tab {
        case .joinWithJSON:
            jsonView.isHidden = false
            joinWithIDView.isHidden = true
        case .joinWithID:
            joinWithIDView.isHidden = false
            jsonView.isHidden = true
        }
    }
    
    override func viewDidLoad() {
        changeTab()
        
        jsonTextView.text = getSavedJSON() ?? defaultJoinJSON
        
        subscribeToUINotifications()
    }
    
    
    private func getJoinJSONFromMeetingID(meetingId: String, passcode: String, name: String) -> String {
        let json = """
    {
            "type": "embedProxy.toProxy",
            "method" : "joinMeeting",
            "args": [{
                "meetingInfo": {
                    "meetingId": "\(meetingId)",
                    "passcode": "\(passcode)",
                    "name": "\(name)"
                },
                "iFrameProps": {
                    "width": "100vw",
                    "height": "100vh",
                    "selectorId": ".iframeHolder"
                },
                "uiProps": {
                    "hideChatPanel": false,
                    "lockMeetingControls": false,
                    "hideCopyLink": false,
                    "hideRatingScreen": false,
                    "inMeetingBGConfig": {
                        "audioTileColor": "",
                        "containerColorOfAllTiles": ""
                    },
                    "locale": "en",
                    "teleHealthConfig": {
                        "skipCheckIn": true,
                        "backgroundColor": "linear-gradient(#6600CC, #6600FF)",
                        "welcomeText": "Welcome to the clinic!",
                        "waitingText": "Please wait for your provider",
                        "resources": {
                            "videos": {
                                "data": [
                                    {
                                        "title": "Video title",
                                        "thumbnailUrl": "https://vid.com",
                                        "url": "https://vid.com",
                                        "duration": "12:10"
                                    }
                                ]
                            }
                        }
                    }
                }
            }]
        }
    """
        return json
    }
    
    @IBAction func join() {
        if isValidInput() {
            performSegue(withIdentifier: "ShowWebViewContainerViewController", sender: self)
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        guard let destinationVC = segue.destination as? WebViewContainerViewController else {
            return
        }
        
        switch tab {
        case .joinWithJSON:
            destinationVC.joinJSON = jsonTextView.text ?? ""
        case .joinWithID:
            destinationVC.joinJSON = generatedJSONTextView.text ?? ""
        }
    }
    
    
    @IBAction func reset() {
        let alert = UIAlertController(
            title: "Reset to Default?",
            message: "Discard your changes and reset to the default values?",
            preferredStyle: .alert
        )
        
        alert.addAction(
            UIAlertAction(title: NSLocalizedString("Yes", comment: "Default action"), style: .default) { [ weak self ] _ in
            self?.setFieldsToDefault()
        })
        
        alert.addAction(
            UIAlertAction(title: NSLocalizedString("No", comment: ""),
                          style: .cancel,
                          handler: nil)
        )
        
        present(alert, animated: true, completion: nil)
    }
    
    private func setFieldsToDefault() {
        switch tab {
        case .joinWithJSON:
            DispatchQueue.main.async {
                self.jsonTextView.text = self.defaultJoinJSON
            }
        case .joinWithID:
            DispatchQueue.main.async {
                self.meetingIdField.text = ""
                self.passcodeField.text = ""
                self.nameField.text = ""
            }
        }
    }
    
    private func isValidInput() -> Bool {
        switch tab {
        case .joinWithJSON:
            return isValidJSON()
        case .joinWithID:
            return isValidMeetingID()
        }
    }
    
    private func isValidJSON() -> Bool {
        guard let jsonString = jsonTextView.text else {
            return false
        }
        
        guard let jsonDataToVerify = jsonString.data(using: String.Encoding.utf8) else {
            return false
        }
        
        do {
            _ = try JSONSerialization.jsonObject(with: jsonDataToVerify)
        } catch {
            presentErrorAlert(title: "Invalid JSON", error: "Error serializing the JSON, check that the syntax is valid.")
            return false
        }
        saveJSON()
        return true
    }
    
    private func isValidMeetingID() -> Bool {
        let validName = !(nameField.text?.isEmpty ?? true)
        let validMeetingID = !(meetingIdField.text?.isEmpty ?? true)
        let isValid = validName && validMeetingID
        if !isValid {
            presentErrorAlert(title: "Invalid Meeting Details", error: "Check that all fields are filled out and correct.")
        }
        return isValid
    }
    
    // MARK: - UI Helpers
    private func subscribeToUINotifications() {
        let keyboardWillShow = NotificationCenter.default.publisher(for: UIResponder.keyboardWillShowNotification)
        let keyboardWillHide = NotificationCenter.default.publisher(for: UIResponder.keyboardWillHideNotification)
        
        keyboardWillShow.merge(with: keyboardWillHide).sink { [ weak self ] notification in
            self?.adjustForKeyboard(notification: notification)
        }.store(in: &subscriptions)
        
        meetingIdField.textPublisher
            .combineLatest(passcodeField.textPublisher, nameField.textPublisher)
            .sink { [ weak self ] meetingId, passcode, name in
                self?.generatedJSONTextView.text = self?.getJoinJSONFromMeetingID(meetingId: meetingId, passcode: passcode, name: name)
            }.store(in: &subscriptions)
    }
    
    @IBAction func tabChanged(_ sender: UISegmentedControl) {
        changeTab()
    }
    
    @IBAction func unwindToJoin(_ unwindSegue: UIStoryboardSegue) {
    }
    
    private func saveJSON() {
        let userDefaults = UserDefaults.standard
        userDefaults.set(jsonTextView.text, forKey: "lastUsedJSON")
    }
    
    private func getSavedJSON() -> String? {
        let userDefaults = UserDefaults.standard
        return userDefaults.string(forKey: "lastUsedJSON")
    }
    
    private func presentErrorAlert(title: String, error: String) {
        let alert = UIAlertController(title: title, message: error, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: "Default action"), style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
    
    private func adjustForKeyboard(notification: Notification) {
        let userInfo = notification.userInfo
        guard let animationCurveValue = userInfo?[UIResponder.keyboardAnimationCurveUserInfoKey] as? Int,
              let animationCurve = UIView.AnimationCurve(rawValue: animationCurveValue),
              let animationDuration = userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as? Double,
              let keyboardValue = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else { return }
        
        let keyboardFrame = keyboardValue.cgRectValue
        var constant = view.bounds.height-max(0, view.convert(keyboardFrame, from: nil).origin.y)
        
        if notification.name == UIResponder.keyboardWillHideNotification {
            constant += view.safeAreaInsets.bottom
        }
        
        UIViewPropertyAnimator(duration: animationDuration, curve: animationCurve) { [ weak self ] in
            self?.keyboardViewHeight.constant = constant
            self?.view.layoutIfNeeded()
        }.startAnimation()
    }
    
    override func viewSafeAreaInsetsDidChange() {
        keyboardViewHeight.constant = view.safeAreaInsets.bottom
        view.layoutIfNeeded()
    }
}

extension UITextField {
    var textPublisher: AnyPublisher<String, Never> {
        return NotificationCenter.default
            .publisher(for: UITextField.textDidChangeNotification, object: self)
            .map { ($0.object as? UITextField)?.text  ?? "" }
            .prepend("")
            .eraseToAnyPublisher()
    }
}

enum Tab {
    case joinWithJSON
    case joinWithID
}
